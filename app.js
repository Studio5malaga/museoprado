// Prado Guía App - Isaac y Jacob by Ribera
// Mobile-first web app for museum visit preparation

let currentTab = 0;
let currentAudio = null;
let audioProgressInterval = null;
let isPlaying = false;

// Tailwind script (already included via CDN)
function initTailwind() {
    // Already handled by CDN, but can add custom classes if needed
    console.log('%c[PradoGuia] Tailwind ready', 'color:#9c8f7b');
}

// Tab switching
function switchTab(tabIndex) {
    // Hide all contents
    document.querySelectorAll('.tab-content').forEach(el => {
        el.classList.add('hidden');
    });
    
    // Deactivate all tabs
    document.querySelectorAll('[id^="tab-"]').forEach(el => {
        el.classList.remove('nav-active');
        el.classList.add('text-[#e8d5b7]');
    });
    
    // Activate target tab
    const targetTab = document.getElementById(`tab-${tabIndex}`);
    if (targetTab) {
        targetTab.classList.add('nav-active');
        targetTab.classList.remove('text-[#e8d5b7]');
    }
    
    // Show target content
    const targetContent = document.getElementById(`content-${tabIndex}`);
    if (targetContent) {
        targetContent.classList.remove('hidden');
    }
    
    currentTab = tabIndex;
    
    // Scroll to top on mobile for better UX
    if (window.innerWidth < 768) {
        window.scrollTo({ top: 120, behavior: 'smooth' });
    }
}

// Highlight lighting on painting
function highlightLighting() {
    const painting = document.getElementById('main-painting');
    if (!painting) return;
    
    // Create dynamic light overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: absolute; 
        top: 0; left: 0; right: 0; bottom: 0;
        background: linear-gradient(120deg, 
            transparent 15%, 
            rgba(234, 179, 8, 0.35) 32%, 
            transparent 58%);
        pointer-events: none;
        border-radius: 22px;
        z-index: 30;
        animation: spotlight-pulse 2.4s ease forwards;
    `;
    
    // Add container for overlay
    const container = painting.parentElement;
    container.style.position = 'relative';
    container.appendChild(overlay);
    
    // Add animation style if not present
    if (!document.getElementById('spotlight-style')) {
        const style = document.createElement('style');
        style.id = 'spotlight-style';
        style.innerHTML = `
            @keyframes spotlight-pulse {
                0% { opacity: 0; }
                15% { opacity: 1; }
                85% { opacity: 1; }
                100% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Show toast
    showToast('¡Key Light desde la izquierda! Mira cómo ilumina a Isaac y deja en sombra a Rebeca.');
    
    // Remove overlay after animation
    setTimeout(() => {
        if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }, 2500);
    
    // Also highlight text on lighting tab if visible
    setTimeout(() => {
        const lightTab = document.getElementById('content-1');
        if (lightTab && !lightTab.classList.contains('hidden')) {
            lightTab.style.transitionDuration = '120ms';
            lightTab.style.boxShadow = '0 0 0 3px rgba(234, 179, 8, 0.4)';
            setTimeout(() => {
                lightTab.style.boxShadow = 'none';
            }, 1600);
        }
    }, 500);
}

// Simple toast notification
function showToast(message, duration = 2800) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed; bottom: 68px; left: 50%; transform: translateX(-50%);
        background: #3f2e24; color: #d4af77; border: 1px solid #5c4637;
        padding: 9px 16px; border-radius: 9999px; font-size: 13.5px; 
        max-width: 300px; box-shadow: 0 10px 10px rgb(0 0 0 / 0.2);
        z-index: 9999; display: flex; align-items: center; gap: 8px;
    `;
    toast.innerHTML = `
        <div class="flex items-center gap-x-2">
            <i class="fa-solid fa-info-circle"></i>
            <span style="font-weight:600; font-size:0.9rem;">${message}</span>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.transition = 'all 0.25s ease';
        toast.style.opacity = '0';
        setTimeout(() => {
            if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, 140);
    }, duration);
}

// Color demo: show visual overlay on image
function showColorDemo() {
    const painting = document.getElementById('main-painting');
    if (!painting) return;
    
    const container = painting.parentElement;
    container.style.position = 'relative';
    
    // Remove any existing demo overlays
    const existing = container.querySelector('.color-demo-overlay');
    if (existing) existing.remove();
    
    const overlay = document.createElement('div');
    overlay.className = 'color-demo-overlay';
    overlay.style.cssText = `
        position: absolute; top: 0; left: 0; right: 0; bottom: 0;
        pointer-events: none; z-index: 20; border-radius: 22px; overflow: hidden;
    `;
    
    // Add colored regions: left / center (red for Isaac) and right (blue for Jacob)
    overlay.innerHTML = `
        <div style="position:absolute; top:22%; left:11%; width:38%; height:58%; background: linear-gradient(#9c2f2f, #9c2f2f); opacity:0.3; border-radius: 40%; filter: blur(1px);"></div>
        <div style="position:absolute; top:23%; left:53%; width:28%; height:64%; background: linear-gradient(#2a4a6f, #2a4a6f); opacity:0.38; border-radius: 40%; filter: blur(1px);"></div>
        
        <div style="position:absolute; top:18%; left:13%; font-size:9.5px; font-weight:800; color:#f0c9a0; background:rgba(0,0,0,.4); padding:1px 7px; border-radius:9999px; letter-spacing:.5px;">
            ROJO = Isaac
        </div>
        <div style="position:absolute; top:21%; left:55%; font-size:9.5px; font-weight:800; color:#a6c0e6; background:rgba(0,0,0,.4); padding:1px 7px; border-radius:9999px; letter-spacing:.5px;">
            AZUL = Jacob
        </div>
    `;
    
    container.appendChild(overlay);
    
    // Add explanatory toast
    showToast('Rojo avanza (Isaac) • Azul retrocede (Jacob). Mira el contraste en el cuadro.');
    
    // Auto-remove after 6s
    setTimeout(() => {
        if (overlay && overlay.parentNode) {
            overlay.style.transition = 'opacity .35s ease';
            overlay.style.opacity = '0';
            setTimeout(() => {
                if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
            }, 250);
        }
    }, 5800);
    
    // Bonus: switch to color tab if not active
    setTimeout(() => {
        const colorTab = document.getElementById('content-2');
        if (colorTab && colorTab.classList.contains('hidden')) {
            switchTab(2);
        }
    }, 1700);
}

// Highlight Rebeca's eyes detail
function showRebecaEyesModal() {
    const modal = document.createElement('div');
    modal.className = `fixed inset-0 bg-black/90 flex items-end md:items-center justify-center z-[210]`;
    modal.innerHTML = `
        <div onclick="event.target.remove()" class="bg-[#2c211b] w-full max-w-[380px] md:max-w-[340px] md:rounded-3xl md:m-3 rounded-t-3xl border border-[#5c4637]">
            <div class="px-4 pt-4 pb-2">
                <div class="flex justify-between items-center px-1">
                    <div>
                        <span class="font-extrabold">Los ojos de Rebeca</span>
                    </div>
                    <div class="px-2 cursor-pointer text-[#9c8f7b]" onclick="event.target.closest('.fixed').remove()">
                        <i class="fa-solid fa-times fa-lg"></i>
                    </div>
                </div>
                
                <div class="mt-3 px-1">
                    <div class="rounded-2xl bg-black/60 p-3 border border-[#5c4637]">
                        <div class="flex items-center mb-1">
                            <div class="w-5 h-5 bg-black rounded-full flex-shrink-0 mr-2.5 border border-[#9c8f7b]"></div>
                            <div class="font-bold text-sm">Ojos sin catchlight</div>
                        </div>
                        
                        <div class="text-xs px-1 leading-relaxed">
                            Rebeca tiene los ojos completamente negros, sin brillo alguno. 
                            Ribera usa esta técnica para mostrar que es la mente fría detrás del engaño.
                        </div>
                        
                        <div class="mt-3 text-xs font-extrabold flex items-center px-1">
                            <span class="px-2 py-px bg-[#3f2e24] rounded-xl text-[#d4af77] text-[10px]">CINE 300 AÑOS ANTES</span>
                        </div>
                        
                        <div class="text-xs mt-3 px-1">
                            Igual que Gordon Willis en <span class="italic">El Padrino</span> (1972): iluminar desde arriba para quitar el brillo de los ojos.
                        </div>
                    </div>
                </div>
                
                <div class="px-1 pt-3 flex items-center">
                    <div onclick="this.closest('.fixed').remove(); switchTab(3)" class="flex-1 cursor-pointer text-center px-3 py-[9px] bg-[#3f2e24] hover:bg-[#5c4637] transition-colors text-xs font-extrabold rounded-3xl">Ver guion 2 minutos</div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Infografía modal
function showInfografia() {
    const modal = document.getElementById('infografia-modal');
    if (modal) {
        // Reset zoom when opening
        const img = document.getElementById('infografia-img');
        if (img) img.style.transform = 'scale(1)';
        modal.style.display = 'flex';
    }
}

function hideInfografiaModal() {
    const modal = document.getElementById('infografia-modal');
    if (modal) {
        // Reset zoom when closing
        const img = document.getElementById('infografia-img');
        if (img) img.style.transform = 'scale(1)';
        modal.style.display = 'none';
    }
}

// Zoom for infografía - controlled and safe (never hides close button)
function toggleInfografiaZoom(img) {
    if (!img) return;
    
    const current = img.style.transform || '';
    const match = current.match(/scale\(([\d.]+)\)/);
    const currentScale = match ? parseFloat(match[1]) : 1;
    
    if (currentScale > 1.05) {
        // Reset to normal
        img.style.transform = 'scale(1)';
    } else {
        // Safe zoom level — small enough that header + close button remain visible
        img.style.transform = 'scale(2.05)';
        
        // Scroll the image container a little so user sees the top of the infografía
        setTimeout(() => {
            const container = img.closest('.overflow-auto') || img.parentElement;
            if (container) {
                container.scrollTop = 10;
            }
        }, 120);
    }
}

// Plano modal
function showPlanoModal() {
    const modal = document.getElementById('plano-modal');
    if (modal) modal.style.display = 'flex';
}

function hidePlanoModal() {
    const modal = document.getElementById('plano-modal');
    if (modal) modal.style.display = 'none';
}

// Open official Prado link
function openPradoLink() {
    window.open('https://www.museodelprado.es/coleccion/obra-de-arte/isaac-y-jacob/a2fc21e7-1220-44cf-9708-0646ba26e9f2', '_blank');
}

// Share modal
function showShareModal() {
    const modal = document.getElementById('share-modal');
    if (modal) modal.style.display = 'flex';
}

function hideShareModal() {
    const modal = document.getElementById('share-modal');
    if (modal) modal.style.display = 'none';
}

// Share functions
function shareVia(platform) {
    const url = window.location.href;
    const title = 'Isaac y Jacob - Guía de Ribera | Museo del Prado';
    const text = '¡Mira esta guía para explicar el cuadro de Ribera en el Prado! Isaac bendiciendo a Jacob.';
    
    hideShareModal();
    
    switch (platform) {
        case 'whatsapp':
            window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
            break;
        case 'telegram':
            window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
            break;
        case 'copy':
            navigator.clipboard.writeText(url).then(() => {
                showToast('¡Enlace copiado al portapapeles!');
            }).catch(() => {
                // Fallback
                const inp = document.createElement('input');
                inp.value = url;
                document.body.appendChild(inp);
                inp.select();
                document.execCommand('copy');
                document.body.removeChild(inp);
                showToast('¡Enlace copiado!');
            });
            break;
        case 'native':
            if (navigator.share) {
                navigator.share({ title, text, url }).catch(() => {});
            } else {
                showToast('Usa el botón de compartir del navegador');
            }
            break;
    }
}

// Audio guides data (in Spanish, with approx. timing)
const audioGuides = [
    {
        id: 0,
        title: "Introducción al cuadro",
        duration: 28,
        text: "Bienvenido al Prado. Hoy vamos a hablar de Isaac bendiciendo a Jacob de José de Ribera. Un cuadro pintado en 1637. Un formato panorámico que parece un escenario de teatro."
    },
    {
        id: 1,
        title: "La historia completa",
        duration: 65,
        text: "Isaac es viejo y ciego. Rebeca, su esposa, prefiere a Jacob. Mientras Esaú va a cazar, Rebeca cocina dos cabritos y viste a Jacob con pieles para que engañe a su padre. Isaac bendice a Jacob pensando que es Esaú."
    },
    {
        id: 2,
        title: "Guion iluminación (1 minuto)",
        duration: 58,
        text: "Fijaos que solo hay una fuente de luz dura desde la izquierda, sin relleno. El que más luz recibe es Isaac, que es ciego. Su barba blanca y la sábana hacen de reflector. La madre Rebeca, que organiza el engaño, está en la sombra. La luz aquí no revela la verdad, ayuda a mentir. Y ese mantel blanco de la derecha es un reflector para que el cuadro no se caiga en negro."
    },
    {
        id: 3,
        title: "Guion ojos de Rebeca (2 min)",
        duration: 72,
        text: "Mirad los ojos de Rebeca, al fondo. Son negros totales, sin brillo. En teatro, si quitas el brillo de los ojos le quitas la humanidad al personaje. Es el truco de El Padrino. Ribera la pinta así para decirnos que es el cerebro frío de la operación. Ella está en bambalinas, controlando la función, mientras empuja a su hijo al escenario iluminado."
    },
    {
        id: 4,
        title: "Guion conspirativo (cierre)",
        duration: 65,
        text: "Este cuadro no estaba en una iglesia. Estaba en la sala de juegos del Palacio Real, la pieza de trucos. Un cuadro de un engaño colgado en la sala de trucos. En la época de Felipe IV, con validos corruptos, esto se leía como metáfora: la autoridad ciega es manipulada por intrigantes desde la sombra mientras un farsante con disfraz se lleva la herencia."
    }
];

// Play audio guide - now uses real MP3 files for reliable playback
function playAudioGuide(guideIndex) {
    const guide = audioGuides[guideIndex];
    if (!guide) return;
    
    // Stop any previous audio
    stopAudio();
    
    // Show audio bar
    const audioBar = document.getElementById('audio-bar');
    const audioTitle = document.getElementById('audio-title');
    const audioTime = document.getElementById('audio-time');
    const audioProgress = document.getElementById('audio-progress');
    const audioIcon = document.getElementById('audio-icon');
    
    audioTitle.textContent = guide.title;
    audioTime.textContent = '0:00';
    audioProgress.style.width = '0%';
    audioIcon.classList.remove('fa-play');
    audioIcon.classList.add('fa-pause');
    
    audioBar.classList.remove('hidden');
    audioBar.classList.add('flex');
    
    // Use real audio files (generated MP3s)
    const audio = new Audio(`audio/guia-${guideIndex}.mp3`);
    currentAudio = audio;
    
    audio.onended = () => {
        stopAudio(true);
    };
    
    audio.ontimeupdate = () => {
        if (!audio.duration) return;
        const progress = (audio.currentTime / audio.duration) * 100;
        audioProgress.style.width = progress + '%';
        
        const minutes = Math.floor(audio.currentTime / 60);
        const seconds = Math.floor(audio.currentTime % 60);
        audioTime.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };
    
    audio.play().then(() => {
        isPlaying = true;
    }).catch(err => {
        console.warn('Audio playback failed, using TTS fallback:', err);
        // Fallback to TTS if MP3 fails
        useTTSAudio(guide, guideIndex);
    });
    
    // Store current guide index for toggle
    audioBar.dataset.currentGuide = guideIndex;
}

// NEW: Play custom attached audios (audioguia.mp3 and Laestafa.mp3)
// Call with index 5 or 6
function playCustomAudio(customIndex) {
    stopAudio();
    
    const audioBar = document.getElementById('audio-bar');
    const audioTitle = document.getElementById('audio-title');
    const audioTime = document.getElementById('audio-time');
    const audioProgress = document.getElementById('audio-progress');
    const audioIcon = document.getElementById('audio-icon');
    
    let fileName = '';
    let displayTitle = '';
    
    if (customIndex === 5) {
        fileName = 'audioguia.mp3';
        displayTitle = 'Audioguía completa (adjunta)';
    } else if (customIndex === 6) {
        fileName = 'Laestafa.mp3';
        displayTitle = 'La estafa (adjunta)';
    } else {
        return;
    }
    
    audioTitle.textContent = displayTitle;
    audioTime.textContent = '0:00';
    audioProgress.style.width = '0%';
    audioIcon.classList.remove('fa-play');
    audioIcon.classList.add('fa-pause');
    
    audioBar.classList.remove('hidden');
    audioBar.classList.add('flex');
    
    const audio = new Audio(`audio/${fileName}`);
    currentAudio = audio;
    
    audio.onended = () => stopAudio(true);
    
    audio.ontimeupdate = () => {
        if (!audio.duration) return;
        const progress = (audio.currentTime / audio.duration) * 100;
        audioProgress.style.width = progress + '%';
        
        const min = Math.floor(audio.currentTime / 60);
        const sec = Math.floor(audio.currentTime % 60);
        audioTime.textContent = `${min}:${sec.toString().padStart(2, '0')}`;
    };
    
    audio.play().catch(err => {
        console.warn('Custom audio failed to play:', err);
        showToast('No se pudo reproducir el audio. Asegúrate de que ' + fileName + ' esté en la carpeta audio/.');
        stopAudio(true);
    });
    
    audioBar.dataset.currentGuide = 'custom-' + customIndex;
}

// Fallback TTS (if real audio unavailable)
function useTTSAudio(guide, guideIndex) {
    const audioBar = document.getElementById('audio-bar');
    const audioProgress = document.getElementById('audio-progress');
    const audioTime = document.getElementById('audio-time');
    const audioIcon = document.getElementById('audio-icon');
    
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(guide.text);
        utterance.lang = 'es-ES';
        utterance.rate = 0.93;
        utterance.pitch = 1.04;
        
        const voices = window.speechSynthesis.getVoices();
        const spanishVoice = voices.find(v => v.lang.includes('es'));
        if (spanishVoice) utterance.voice = spanishVoice;
        
        currentAudio = utterance;
        
        let startTime = Date.now();
        
        utterance.onend = () => stopAudio(true);
        
        window.speechSynthesis.speak(utterance);
        isPlaying = true;
        
        audioProgressInterval = setInterval(() => {
            if (!isPlaying) return;
            const elapsed = (Date.now() - startTime) / 1000;
            const progress = Math.min((elapsed / guide.duration) * 100, 100);
            audioProgress.style.width = progress + '%';
            
            const min = Math.floor(elapsed / 60);
            const sec = Math.floor(elapsed % 60);
            audioTime.textContent = `${min}:${sec.toString().padStart(2, '0')}`;
            
            if (progress >= 99) clearInterval(audioProgressInterval);
        }, 280);
    } else {
        showToast('No se pudo reproducir el audio.');
        stopAudio(true);
    }
}

// Toggle current audio (supports both real Audio and TTS fallback)
function toggleAudio() {
    const audioBar = document.getElementById('audio-bar');
    const audioIcon = document.getElementById('audio-icon');
    const progressBar = document.getElementById('audio-progress');
    
    if (!audioBar || !currentAudio) return;
    
    if (isPlaying) {
        // Pause
        if (currentAudio instanceof Audio) {
            currentAudio.pause();
        } else if ('speechSynthesis' in window) {
            window.speechSynthesis.pause();
        }
        clearInterval(audioProgressInterval);
        isPlaying = false;
        
        audioIcon.classList.remove('fa-pause');
        audioIcon.classList.add('fa-play');
        audioBar.style.opacity = '0.9';
        
    } else {
        // Resume
        if (currentAudio instanceof Audio) {
            currentAudio.play().catch(() => {});
        } else if ('speechSynthesis' in window) {
            window.speechSynthesis.resume();
        }
        
        isPlaying = true;
        audioIcon.classList.remove('fa-play');
        audioIcon.classList.add('fa-pause');
        audioBar.style.opacity = '1';
        
        // If using TTS fallback, restart interval
        if (!(currentAudio instanceof Audio)) {
            const currentPercent = parseFloat(progressBar.style.width) || 0;
            const guideIndex = parseInt(audioBar.dataset.currentGuide || '0');
            const guide = audioGuides[guideIndex];
            if (!guide) return;
            
            let elapsed = (currentPercent / 100) * guide.duration;
            
            audioProgressInterval = setInterval(() => {
                if (!isPlaying) return;
                elapsed += 0.28;
                
                const progress = Math.min((elapsed / guide.duration) * 100, 100);
                progressBar.style.width = progress + '%';
                
                const min = Math.floor(elapsed / 60);
                const sec = Math.floor(elapsed % 60);
                document.getElementById('audio-time').textContent = `${min}:${sec.toString().padStart(2, '0')}`;
                
                if (progress >= 99) {
                    stopAudio(true);
                }
            }, 280);
        }
    }
}

// Stop audio completely
function stopAudio(finished = false) {
    const audioBar = document.getElementById('audio-bar');
    const audioIcon = document.getElementById('audio-icon');
    
    if (currentAudio) {
        if (currentAudio instanceof Audio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        } else if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
    }
    
    clearInterval(audioProgressInterval);
    
    if (audioBar) {
        if (finished) {
            setTimeout(() => {
                if (audioBar) {
                    audioBar.classList.remove('flex');
                    audioBar.classList.add('hidden');
                }
            }, 1100);
        } else {
            audioBar.classList.remove('flex');
            audioBar.classList.add('hidden');
        }
    }
    
    isPlaying = false;
    currentAudio = null;
    
    if (audioIcon) {
        audioIcon.classList.remove('fa-pause');
        audioIcon.classList.add('fa-play');
    }
}

// Initialize everything
function initApp() {
    initTailwind();
    
    // Default tab: Historia (0)
    switchTab(0);
    
    // Keyboard support for tabs (accessibility)
    document.addEventListener('keydown', function(e) {
        if (e.key === '?' && document.activeElement.tagName === 'BODY') {
            e.preventDefault();
            const next = (currentTab + 1) % 4;
            switchTab(next);
        }
        
        if (e.key.toLowerCase() === 'l' && currentTab === 1) {
            highlightLighting();
        }
    });
    
    // Add nice loading animation on main painting
    const painting = document.getElementById('main-painting');
    if (painting) {
        painting.onload = function() {
            painting.style.transitionDuration = '300ms';
        };
        
        // Easter egg: tap on image to show lighting
        painting.addEventListener('click', function() {
            highlightLighting();
            
            // Bonus: flash a small fact
            setTimeout(() => {
                if (Math.random() > 0.6) {
                    showToast('¿Sabías que el cuadro se encontraba en la sala de juegos del Palacio Real?');
                }
            }, 3100);
        });
        
        // Make it slightly more interactive on touch devices
        painting.addEventListener('touchstart', function() {
            painting.style.transform = 'scale(1.01)';
        }, {passive: true});
        
        painting.addEventListener('touchend', function() {
            painting.style.transform = 'scale(1)';
        });
    }
    
    // Preload images (SVG placeholders)
    const imagesToPreload = ['images/cuadro-ribera.svg', 'images/plano-prado.svg', 'images/infografia.svg'];
    imagesToPreload.forEach(src => {
        const img = new Image();
        img.src = src;
    });
    
    // Welcome toast for first time visitors
    setTimeout(() => {
        const hasVisited = localStorage.getItem('prado_guide_visited');
        if (!hasVisited) {
            // showToast('¡Hola! Esta guía está hecha para que puedas explicar el cuadro a tus amigos en el Prado.', 3200);
            localStorage.setItem('prado_guide_visited', 'true');
        }
    }, 5000);
    
    // Bonus: add swipe support on mobile to change tabs
    let touchStartX = 0;
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', function(e) {
        const touchEndX = e.changedTouches[0].screenX;
        const deltaX = touchEndX - touchStartX;
        
        if (Math.abs(deltaX) > 75) {
            let nextTab = currentTab;
            if (deltaX < 0) {
                nextTab = (currentTab + 1) % 4;
            } else {
                nextTab = (currentTab - 1 + 4) % 4;
            }
            switchTab(nextTab);
        }
    });
    
    // Add accessibility label for painting
    if (painting) {
        painting.setAttribute('aria-label', 'Pintura de Isaac bendiciendo a Jacob de José de Ribera. Un anciano ciego bendice a un joven con pieles en el brazo, mientras una mujer observa desde el fondo.');
    }
    
    // Make sure all audio buttons are set
    console.log('%c[PradoGuia] App initialized successfully — ready for Prado visit.', 'color:#d4af77');
    
    // Dev helper: expose some functions in console
    window.PradoGuia = {
        highlightLighting,
        switchTab,
        playAudioGuide,
        showColorDemo
    };
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// Handle PWA-like: prevent pull-to-refresh on mobile in certain cases (nice UX)
document.addEventListener('touchmove', function(e) {
    if (e.target.closest('.tab-content') || e.target.closest('#audio-bar')) {
        // allow scroll
    }
}, { passive: true });

// Easter egg: press "r" to show red/blue demo
document.addEventListener('keypress', function(e) {
    if (e.key.toLowerCase() === 'r' && document.getElementById('content-2') && !document.getElementById('content-2').classList.contains('hidden')) {
        showColorDemo();
    }
});