import './demo.scss';
import {SwipeContainerElement, SwipeItemEvents} from '../swipe-container/swipe-container';

document.addEventListener('WebComponentsReady', () => {
    const element = document.getElementsByClassName('panel-container')?.item(0) as SwipeContainerElement;
    element.addEventListener(SwipeItemEvents.SwipeItemShow, event => {
       console.log('show', element.swipeContainer.items.indexOf(event.target as HTMLElement));
    });
    element.addEventListener(SwipeItemEvents.SwipeItemHide, event => {
        console.log('hide', element.swipeContainer.items.indexOf(event.target as HTMLElement));
    });
    document.querySelector('#remove').addEventListener('click', function () {
        element.swipeContainer.removeItem(0);
    });
    document.querySelector('#clear').addEventListener('click', function () {
        element.swipeContainer.clear();
    });
});
