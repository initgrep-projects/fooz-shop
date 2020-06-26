import { trigger, transition, style, animate, state, stagger, query, keyframes } from '@angular/animations';


export const slideIn = trigger('slideIn',[
    transition('void <=> *',[
      animate('.5s ease-in', keyframes([
        style({ opacity: 0, transform: 'translateY(-50%)', offset: 0 }),
        style({ opacity: .5, transform: 'translateY(-10px) scale(1)', offset: 0.5 }),
        style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
      ])
      )
    ])
  ]);
  
export const staggerSlideIn = trigger('staggerSlideIn', [
    transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(':enter', stagger('300ms', [
            animate('.5s ease-in', keyframes([
                style({ opacity: 0, transform: 'translateY(-50%)', offset: 0 }),
                style({ opacity: .5, transform: 'translateY(-10px) scale(1)', offset: 0.5 }),
                style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
            ]))]), { optional: true }),
        query(':leave', stagger('300ms', [
            animate('500ms ease-out', keyframes([
                style({ backgroundColor: 'rgba(255,0,0,0.5)', opacity: 1, transform: 'scale(1.1)', offset: 0 }),
                style({ backgroundColor: 'rgba(255,0,0,0.1)', opacity: .5, transform: 'scale(.5)', offset: 0.3 }),
                style({ opacity: 0, transform: 'scale(0)', offset: 1 }),
            ]))]), { optional: true })
    ]),
]);

export const staggerSlideInList = trigger('staggerSlideInList', [
  transition('* => *', [
      query('.list-group-item', style({ opacity: 0 }), { optional: true }),
      query('.list-group-item', stagger('300ms', [
          animate('.5s ease-in', keyframes([
              style({ opacity: 0, transform: 'translateY(-50%)', offset: 0 }),
              style({ opacity: .5, transform: 'translateY(-10px) scale(1)', offset: 0.5 }),
              style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
          ]))]), { optional: true })
     
  ]),
]) 