import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private stop$ = new Subject();
  private audioObj = new Audio();

  constructor() { }

  listenTocanPlay() {
    return Observable.create(observer => {
      const handler = (event) =>  observer.next(event);
      this.audioObj.addEventListener('canplay', handler );

      return () => this.audioObj.removeEventListener('canplay', handler);
    });
  }

  private streamObservable(url) {
    const events = [
      'ended', 'error', 'play', 'playing', 'pause', 'timeupdate', 'canplay', 'loadedmetadata', 'loadstart'
    ];

    const addEvents = (obj, events, handler) => {
      events.forEach((event: any) => {
        obj.addEventListener(event, handler);
      });
    };

    const removeEvents = function(obj, events, handler) {
      events.forEach(event => {
        obj.removeEventListener(event, handler);
      });
    };

    return Observable.create(observer => {
      // Play audio
      this.audioObj.src = url;
      this.audioObj.load();
      this.audioObj.play();

      // Media Events
      const handler = (event) =>  observer.next(event);
      addEvents(this.audioObj, events, handler);

      return () => {
        // Stop Playing
        this.audioObj.pause();
        this.audioObj.currentTime = 0;

        // Remove EventListeners
        removeEvents(this.audioObj, events, handler);
      };
    });
  }

  playStream(url) {
    return this.streamObservable(url).pipe(takeUntil(this.stop$));
  }

  play() {
    this.audioObj.play();
  }

  pause() {
    this.audioObj.pause();
  }

  stop() {
    this.stop$.next();
  }

  seekTo(seconds) {
    this.audioObj.currentTime = seconds;
  }

  formatTime(time, format) {
    return moment.utc(time).format(format);
  }
}
