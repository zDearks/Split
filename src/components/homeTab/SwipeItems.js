import { useEffect } from 'react';

const SWIPE_THRESHOLD_RATIO = 0.2;

function SwipeItems({ ready }) {
    useEffect(() => {
        let startX;
        let currentTranslate = 0;
        let isDragging = false;

        const touchStart = (event) => {
            startX = getPositionX(event);
            isDragging = true;

            const targetItem = event.currentTarget;
            targetItem.classList.add('grabbing');
        };

        const touchMove = (event) => {
            if (isDragging) {
                const currentPosition = getPositionX(event);
                const diff = currentPosition - startX;

                if (diff < 0) {
                    currentTranslate = diff;
                    event.currentTarget.style.transform = `translateX(${currentTranslate}px)`;
                }
            }
        };

        const touchEnd = (event) => {
            isDragging = false;

            const targetItem = event.currentTarget;
            const itemWidth = targetItem.offsetWidth;
            const swipeThreshold = itemWidth * SWIPE_THRESHOLD_RATIO;

            if (Math.abs(currentTranslate) > swipeThreshold) {
                handleSwipeAction(targetItem);
            } else {
                targetItem.style.transition = 'transform 0.3s ease';
                targetItem.style.transform = 'translateX(0)';
            }

            targetItem.classList.remove('grabbing');

            targetItem.addEventListener(
                'transitionend',
                () => {
                    targetItem.style.transition = '';
                },
                { once: true }
            );
            currentTranslate = 0;
        };

        const getPositionX = (event) => {
            return event.type.includes('mouse')
                ? event.pageX
                : event.touches[0].clientX;
        };

        const handleSwipeAction = (item) => {
            item.style.transition = 'transform 0.5s ease';
            item.style.transform = `translateX(-100%)`;

            item.addEventListener(
                'transitionend',
                () => {
                    item.style.display = 'none';
                },
                { once: true }
            );
        };

        if (ready == 1) {
            const items = Array.from(
                document.querySelectorAll('.debt-item.unpaid')
            );
            items.forEach((item) => {
                item.addEventListener('touchstart', touchStart);
                item.addEventListener('touchend', touchEnd);
                item.addEventListener('touchmove', touchMove);
                item.addEventListener('mousedown', touchStart);
                item.addEventListener('mouseup', touchEnd);
                item.addEventListener('mouseleave', touchEnd);
                item.addEventListener('mousemove', touchMove);
            });

            return () => {
                items.forEach((item) => {
                    item.removeEventListener('touchstart', touchStart);
                    item.removeEventListener('touchend', touchEnd);
                    item.removeEventListener('touchmove', touchMove);
                    item.removeEventListener('mousedown', touchStart);
                    item.removeEventListener('mouseup', touchEnd);
                    item.removeEventListener('mouseleave', touchEnd);
                    item.removeEventListener('mousemove', touchMove);
                });
            };
        }
    }, []);

    return null;
}

export default SwipeItems;
