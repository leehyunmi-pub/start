document.addEventListener("DOMContentLoaded", function(){
    //100vh
    setTimeout(function(){    
        let vh = window.innerHeight * 0.01;    
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    },2000);

    window.addEventListener('resize',function(){
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });

    //dim 클릭시 팝업 닫힘
    document.body.addEventListener('click', function(event) {
        if (event.target.classList.contains('dim')) {
            
            const popup = event.target.closest('.layer_popup');
            
            if (popup) {
                const popupId = popup.id;
                onCloseLayerPopup(popupId);
            }
        }
    });

    //mouse motion
    const cursor2 = document.querySelector("#dh_cursor");
    window.addEventListener("mousemove", e => {
        gsap.to(cursor2, {duration: 1, left: e.pageX, top: e.pageY});
    });
    
    //hover motion
    document.querySelectorAll('[data-cursor-text]').forEach(function(element) {
        element.addEventListener('mouseenter', function() {
            let dataText = element.getAttribute('data-cursor-text');
            
            document.getElementById('dh_cursor').classList.add('cursor_hover');
            document.querySelector('.dh_cursor_circle .cursor_text').innerHTML = dataText;
        });

        element.addEventListener('mouseleave', function() {
            document.getElementById('dh_cursor').classList.remove('cursor_hover');
        });
    });
});

function onOpenLayerPopup(name,target) {
    const isLayerName = document.querySelector('#' + name);
    if (!isLayerName.classList.contains('show') && !isLayerName.classList.contains('bottom_popup')) {
        isLayerName.style.display = 'block';
        isLayerName.style.opacity = 0;
        isLayerName.style.transition = 'opacity 0.2s linear';

        setTimeout(function() {
            isLayerName.style.opacity = 1;
        }, 10);
        isLayerName.classList.add('show');
    }else{
        isLayerName.style.display = 'block';
        isLayerName.style.opacity = 0;
        isLayerName.style.transition = 'opacity 0.2s linear';

        setTimeout(function() {
            isLayerName.style.opacity = 1;
            isLayerName.classList.add('show');
        }, 100);
    }
    document.querySelector('body').style.overflow = 'hidden';
    lenis.stop();

    // 팝업열릴때 해당위치로 스크롤이동
    if(target){
        const targetElement = document.getElementById(target);
        targetElement.scrollIntoView({ behavior: "smooth"});
    }
}

function onCloseLayerPopup(name) {
    const isLayerName = document.querySelector('#' + name);
    if (isLayerName.classList.contains('show') && !isLayerName.classList.contains('bottom_popup')) {
        isLayerName.style.display = 'none';
        isLayerName.classList.remove('show');
    }else{
        setTimeout(function() {
            isLayerName.style.display = 'none';
        }, 300);
        isLayerName.classList.remove('show');
    }
    document.querySelector('body').style.overflowY = 'auto';
    lenis.start();
}
