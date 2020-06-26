import { trigger, transition, style, animate, state, stagger, query, keyframes } from '@angular/animations';


export const fadeIn = trigger('fadeIn',[
  transition('void <=> *',[
    animate('.5s ease-in', keyframes([
      style({ opacity: 0 }),
      style({ opacity: .5 }),
      style({ opacity: 1 }),
    ])
    )
  ])
]);

export const staggerFadeIn = trigger('staggerFadeIn', [
  transition('* => *', [
    query(':enter', style({ opacity: 0 }), { optional: true }),
    query(':enter', stagger('300ms', [
      animate('.5s ease-in', keyframes([
        style({ opacity: 0 }),
        style({ opacity: .5 }),
        style({ opacity: 1 }),
      ])
      )
    ]), { optional: true }),

    query(':leave', stagger('300ms', [
      animate('1s ease-in', keyframes([
        style({ opacity: 1, backgroundColor: 'rgba(255,0,0,0.5)' }),
        style({ opacity: .5, backgroundColor: 'rgba(255,0,0,0.2)' }),
        style({ opacity: 0 }),
      ]))]), { optional: true })

  ])
])  