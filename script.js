/* ========================================
   ULTIMATE PRANK WEBSITE - JAVASCRIPT
   Made with 😈 by Govind
   For Rohit Nehra & Ankit
   ======================================== */

// ============== GLOBAL STATE ==============
const state = {
  currentUser: null,
  clicks: 0,
  frustration: 0,
  patience: 100,
  achievements: [],
  isMuted: false,
  loadingResets: 0,
  dodgeAttempts: 0,
  popupChain: 0,
  countdown: 10,
  rageQuitAttempts: 0,
  formSubmits: 0,
  interactionCount: 0,
  victoryThreshold: 50,
  tooltipMessages: [
    "I'm following you 👀",
    "You can't escape me!",
    "Still here? Impressive.",
    "Click something already!",
    "I know what you're thinking...",
    "This is intentional. Yes.",
    "Your cursor looks lonely.",
    "Having fun yet? 😈",
    "Almost there... not really.",
    "Patience is a virtue you don't have.",
  ],
  sarcasticMessages: {
    rohit: [
      "Rohit Nehra, you fell for it! 😂",
      "Classic Rohit move right there.",
      "Rohit bhai, why are you still here?",
      "Nehra ji, patience level: -1000",
      "Rohit, Govind is definitely laughing right now.",
      "Still clicking, Rohit? Bold strategy.",
      "Rohit Nehra: Professional Button Clicker 🏆",
    ],
    ankit: [
      "Ankit bhai, nice try! 😂",
      "Classic Ankit moment.",
      "Ankit, you're doing great! (No you're not)",
      "Ankit, Govind sends his regards 😈",
      "Ankit patience level: loading...",
      "Still at it, Ankit? Respect.",
      "Ankit: Master of Futile Clicking 🏆",
    ],
    tushar: [
      "Tushar, you walked right into this! 😂",
      "Classic Tushar energy right there.",
      "Tushar bhai, giving up yet?",
      "Tushar, Govind planned this just for you 😈",
      "Tushar patience level: buffering...",
      "Tushar the Fearless? More like Tushar the Trapped!",
      "Tushar: Champion of Pointless Clicks 🏆",
    ],
  },
  loadingMessages: [
    "Preparing your experience...",
    "Loading awesome things...",
    "Almost ready...",
    "Just a moment more...",
    "Compiling frustration...",
    "Generating chaos...",
    "99% complete... or is it?",
    "Downloading more RAM...",
    "Reticulating splines...",
    "JK, starting over! 😈",
  ],
  errorMessages: [
    { title: "Error 404", message: "Your patience was not found." },
    { title: "Error 500", message: "Internal Chaos Detected." },
    { title: "Error 418", message: "I'm a teapot. Don't ask." },
    { title: "Error 666", message: "Everything is fine. Trust us." },
    { title: "Error 42", message: "The meaning of life was not found here." },
    { title: "Error 1337", message: "You've been h4ck3d by fun." },
    { title: "Error ???", message: "Something happened. We don't know what." },
  ],
  achievementsList: [
    {
      id: "first_click",
      text: "First Click! 🎯 You're doomed now.",
      threshold: 1,
    },
    { id: "ten_clicks", text: "10 Clicks! Still going? 🤔", threshold: 10 },
    {
      id: "patience_25",
      text: "Patience at 75%! It's working 😈",
      threshold: 25,
    },
    {
      id: "dodge_5",
      text: "5 Dodge Attempts! The button is faster 🏃",
      threshold: 5,
    },
    { id: "loading_reset", text: "Loading Reset! Gotcha! 😂", threshold: 1 },
    { id: "rage_quit_1", text: "Rage Quit Failed! Nice try 🚪", threshold: 1 },
    {
      id: "popup_hell",
      text: "Popup Survivor! You're persistent 💪",
      threshold: 1,
    },
    { id: "form_submit", text: "Form Submitted! To nowhere 📝", threshold: 1 },
    { id: "clicks_50", text: "50 Useless Clicks! Legend 🏆", threshold: 50 },
    {
      id: "masochist",
      text: "Still Here? Masochist Achievement! 🎭",
      threshold: 100,
    },
  ],
};

// ============== AUDIO CONTEXT ==============
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playSound(frequency, duration, type = "sine") {
  if (state.isMuted) return;

  try {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + duration
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  } catch (e) {
    console.log("Audio not supported");
  }
}

function playClickSound() {
  playSound(800, 0.1, "square");
}

function playErrorSound() {
  playSound(200, 0.3, "sawtooth");
  setTimeout(() => playSound(150, 0.3, "sawtooth"), 100);
}

function playSuccessSound() {
  playSound(523, 0.1, "sine");
  setTimeout(() => playSound(659, 0.1, "sine"), 100);
  setTimeout(() => playSound(784, 0.2, "sine"), 200);
}

function playAnnoyingSound() {
  playSound(1000, 0.05, "square");
  setTimeout(() => playSound(1200, 0.05, "square"), 50);
  setTimeout(() => playSound(800, 0.05, "square"), 100);
}

// ============== DOM ELEMENTS ==============
const elements = {
  loginScreen: document.getElementById("loginScreen"),
  mainArea: document.getElementById("mainArea"),
  mainTitle: document.getElementById("mainTitle"),
  subtitle: document.getElementById("subtitle"),
  muteBtn: document.getElementById("muteBtn"),
  cursorTooltip: document.getElementById("cursorTooltip"),
  loadingProgress: document.getElementById("loadingProgress"),
  loadingText: document.getElementById("loadingText"),
  loadingMessage: document.getElementById("loadingMessage"),
  dodgeBtn: document.getElementById("dodgeBtn"),
  dodgeContainer: document.getElementById("dodgeContainer"),
  dodgeHint: document.getElementById("dodgeHint"),
  countdownDisplay: document.getElementById("countdownDisplay"),
  countdownMessage: document.getElementById("countdownMessage"),
  driftText: document.getElementById("driftText"),
  rageQuitBtn: document.getElementById("rageQuitBtn"),
  fakeForm: document.getElementById("fakeForm"),
  popupOverlay: document.getElementById("popupOverlay"),
  popupTitle: document.getElementById("popupTitle"),
  popupMessage: document.getElementById("popupMessage"),
  popupYes: document.getElementById("popupYes"),
  popupNo: document.getElementById("popupNo"),
  errorOverlay: document.getElementById("errorOverlay"),
  errorTitle: document.getElementById("errorTitle"),
  errorMessage: document.getElementById("errorMessage"),
  errorBtn: document.getElementById("errorBtn"),
  victoryScreen: document.getElementById("victoryScreen"),
  victorySubtitle: document.getElementById("victorySubtitle"),
  victoryStats: document.getElementById("victoryStats"),
  restartBtn: document.getElementById("restartBtn"),
  achievementContainer: document.getElementById("achievementContainer"),
  clickCount: document.getElementById("clickCount"),
  patienceLevel: document.getElementById("patienceLevel"),
  frustrationLevel: document.getElementById("frustrationLevel"),
  statsPanel: document.getElementById("statsPanel"),
  confettiContainer: document.getElementById("confettiContainer"),
};

// ============== INITIALIZATION ==============
function init() {
  setupLoginButtons();
  setupMuteButton();
  setupCursorFollower();
  setupDodgeButton();
  setupHellButtons();
  setupFakeForm();
  setupRageQuit();
  setupPopups();
  setupErrorPopup();
  setupVictoryScreen();
  setupGlobalClickTracking();

  // Hide stats initially
  elements.statsPanel.style.opacity = "0";
}

// ============== LOGIN SYSTEM ==============
function setupLoginButtons() {
  const rohitBtn = document.getElementById("rohitLogin");
  const ankitBtn = document.getElementById("ankitLogin");
  const tusharBtn = document.getElementById("tusharLogin");

  rohitBtn.addEventListener("click", () => login("rohit"));
  ankitBtn.addEventListener("click", () => login("ankit"));
  tusharBtn.addEventListener("click", () => login("tushar"));

  // Make login buttons dodge too (sometimes)
  [rohitBtn, ankitBtn, tusharBtn].forEach((btn) => {
    btn.addEventListener("mouseenter", (e) => {
      if (Math.random() < 0.3) {
        const rect = btn.getBoundingClientRect();
        const offsetX = (Math.random() - 0.5) * 50;
        const offsetY = (Math.random() - 0.5) * 30;
        btn.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(1.05)`;
        setTimeout(() => {
          btn.style.transform = "";
        }, 300);
      }
    });
  });
}

function login(user) {
  state.currentUser = user;
  playSuccessSound();

  // Personalize the experience
  const names = {
    rohit: "Rohit Nehra",
    ankit: "Ankit",
    tushar: "Tushar",
  };

  const greetings = {
    rohit: [
      "Welcome, Rohit Nehra! 🎭",
      "Ah, Rohit... You came! 😈",
      "The Legend Himself: Rohit Nehra!",
    ],
    ankit: [
      "Welcome, Ankit! 🎭",
      "Ankit bhai, ready for chaos? 😈",
      "The One and Only: Ankit!",
    ],
    tushar: [
      "Welcome, Tushar! 🎭",
      "Tushar bhai, you're brave! 😈",
      "The Fearless Legend: Tushar!",
    ],
  };

  const subtitles = {
    rohit: "Govind made this especially for you. Good luck! 😇",
    ankit: "Govind sends his regards. Have fun! 😇",
    tushar: "Govind crafted this chaos just for you. Enjoy! 😇",
  };

  elements.mainTitle.textContent =
    greetings[user][Math.floor(Math.random() * greetings[user].length)];
  elements.subtitle.textContent = subtitles[user];

  // Transition
  elements.loginScreen.style.opacity = "0";
  elements.loginScreen.style.transform = "scale(0.9)";

  setTimeout(() => {
    elements.loginScreen.style.display = "none";
    elements.mainArea.style.display = "block";
    elements.statsPanel.style.opacity = "1";

    // Start the chaos
    startLoadingBar();
    startCountdown();
    startTooltipCycle();

    // Show first achievement
    showAchievement("🎮 Game Started! Good luck escaping...");
  }, 500);
}

// ============== MUTE BUTTON ==============
function setupMuteButton() {
  elements.muteBtn.addEventListener("click", () => {
    state.isMuted = !state.isMuted;
    elements.muteBtn.textContent = state.isMuted ? "🔇" : "🔊";
    elements.muteBtn.classList.toggle("muted", state.isMuted);

    if (!state.isMuted) {
      playClickSound();
    }
  });
}

// ============== CURSOR FOLLOWER ==============
function setupCursorFollower() {
  let tooltipTimeout;

  document.addEventListener("mousemove", (e) => {
    elements.cursorTooltip.style.left = e.clientX + 20 + "px";
    elements.cursorTooltip.style.top = e.clientY + 20 + "px";

    // Show tooltip after some movement
    elements.cursorTooltip.classList.add("visible");

    clearTimeout(tooltipTimeout);
    tooltipTimeout = setTimeout(() => {
      elements.cursorTooltip.classList.remove("visible");
    }, 3000);
  });
}

function startTooltipCycle() {
  setInterval(() => {
    const randomMsg =
      state.tooltipMessages[
        Math.floor(Math.random() * state.tooltipMessages.length)
      ];
    elements.cursorTooltip.textContent = randomMsg;
  }, 5000);
}

// ============== LOADING BAR (RESETS AT 99%) ==============
function startLoadingBar() {
  let progress = 0;
  let messageIndex = 0;

  const loadingInterval = setInterval(() => {
    progress += Math.random() * 3;

    if (progress >= 99) {
      progress = 99;
      elements.loadingProgress.style.width = progress + "%";
      elements.loadingText.textContent = "99%";
      elements.loadingMessage.textContent = state.loadingMessages[6];

      // GOTCHA! Reset after a pause
      setTimeout(() => {
        state.loadingResets++;
        progress = 0;
        elements.loadingProgress.style.width = "0%";
        elements.loadingText.textContent = "0%";
        elements.loadingMessage.textContent = state.loadingMessages[9];

        playErrorSound();
        shakeScreen();

        if (state.loadingResets === 1) {
          checkAchievement("loading_reset");
        }

        if (state.loadingResets >= 3) {
          showRandomError();
        }
      }, 2000);
    } else {
      elements.loadingProgress.style.width = progress + "%";
      elements.loadingText.textContent = Math.floor(progress) + "%";

      // Update message
      if (progress > 25 && messageIndex < 1) {
        messageIndex = 1;
        elements.loadingMessage.textContent = state.loadingMessages[1];
      } else if (progress > 50 && messageIndex < 2) {
        messageIndex = 2;
        elements.loadingMessage.textContent = state.loadingMessages[2];
      } else if (progress > 75 && messageIndex < 3) {
        messageIndex = 3;
        elements.loadingMessage.textContent = state.loadingMessages[3];
      } else if (progress > 90 && messageIndex < 4) {
        messageIndex = 4;
        elements.loadingMessage.textContent = state.loadingMessages[4];
      }
    }
  }, 100);
}

// ============== DODGE BUTTON ==============
function setupDodgeButton() {
  const container = elements.dodgeContainer;
  const btn = elements.dodgeBtn;

  const dodgeMessages = [
    "Too slow! 🏃",
    "Almost got me!",
    "Nice try!",
    "You thought!",
    "Faster next time!",
    "Nope!",
    "Haha!",
    "Can't touch this! 🕺",
    "I'm too quick!",
    "Keep trying!",
  ];

  btn.addEventListener("mouseenter", () => {
    state.dodgeAttempts++;
    updateStats();
    checkAchievement("dodge_5");

    const containerRect = container.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();

    // Calculate new position within container
    const maxX = containerRect.width - btnRect.width - 20;
    const maxY = containerRect.height - btnRect.height - 20;

    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;

    btn.style.left = newX + "px";
    btn.style.top = newY + "px";

    // Show message
    elements.dodgeHint.textContent =
      dodgeMessages[Math.floor(Math.random() * dodgeMessages.length)];

    playAnnoyingSound();

    // Change button text occasionally
    if (state.dodgeAttempts % 5 === 0) {
      const texts = [
        "Click Me to Win! 🏆",
        "You Can Do It! 💪",
        "Almost There! 🎯",
        "Just Click! 🖱️",
        "I Dare You! 😈",
        "Come On! 🏃",
      ];
      btn.textContent = texts[Math.floor(Math.random() * texts.length)];
    }
  });

  // If somehow clicked
  btn.addEventListener("click", () => {
    playSuccessSound();
    showAchievement(
      "🎯 IMPOSSIBLE! You clicked it! (Just kidding, it was a glitch)"
    );
    btn.textContent = "Wait, what?! 😱";
    setTimeout(() => {
      btn.textContent = "That didn't count! 🙅";
    }, 1500);
  });
}

// ============== COUNTDOWN (INCREASES) ==============
function startCountdown() {
  const countdownMessages = [
    "Almost there...",
    "Any second now...",
    "Patience...",
    "Wait for it...",
    "So close...",
    "Just a bit more...",
    "Actually, we're adding time 😈",
    "Time is an illusion anyway",
    "Infinite loop engaged!",
    "You expected this to end?",
  ];

  setInterval(() => {
    // Increase instead of decrease!
    state.countdown += Math.floor(Math.random() * 3) + 1;

    const hours = Math.floor(state.countdown / 3600);
    const minutes = Math.floor((state.countdown % 3600) / 60);
    const seconds = state.countdown % 60;

    elements.countdownDisplay.textContent =
      String(hours).padStart(2, "0") +
      ":" +
      String(minutes).padStart(2, "0") +
      ":" +
      String(seconds).padStart(2, "0");

    // Random message
    if (Math.random() < 0.1) {
      elements.countdownMessage.textContent =
        countdownMessages[Math.floor(Math.random() * countdownMessages.length)];
    }

    // Flash color change occasionally
    if (Math.random() < 0.05) {
      elements.countdownDisplay.style.color = [
        "#ff006e",
        "#00f5ff",
        "#39ff14",
        "#fff700",
      ][Math.floor(Math.random() * 4)];
    }
  }, 1000);
}

// ============== HELL BUTTONS ==============
function setupHellButtons() {
  const buttons = document.querySelectorAll(".hell-btn");

  buttons.forEach((btn) => {
    // Random behavior on hover
    btn.addEventListener("mouseenter", () => {
      const behaviors = [
        () => (btn.textContent = "No, pick another!"),
        () => (btn.textContent = "Not this one!"),
        () =>
          (btn.style.transform = `rotate(${
            Math.random() * 30 - 15
          }deg) scale(1.1)`),
        () => (btn.style.opacity = "0.3"),
        () => {
          const colors = ["#ff006e", "#00f5ff", "#39ff14", "#bf00ff"];
          btn.style.background =
            colors[Math.floor(Math.random() * colors.length)];
        },
      ];
      behaviors[Math.floor(Math.random() * behaviors.length)]();
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "";
      btn.style.opacity = "";
      btn.style.background = "";
    });

    btn.addEventListener("click", () => {
      incrementClick();
      playClickSound();

      // Random outcome
      const outcomes = [
        () =>
          showPopup("Are you sure?", "This button does absolutely nothing."),
        () => showRandomError(),
        () => shakeScreen(),
        () => {
          btn.textContent = "Wrong! 😂";
          setTimeout(() => {
            btn.textContent = "Try again";
          }, 1000);
        },
        () => showAchievement(getSarcasticMessage()),
        () => {
          const allBtns = document.querySelectorAll(".hell-btn");
          allBtns.forEach((b) => {
            b.style.transform = `rotate(${Math.random() * 360}deg)`;
          });
          setTimeout(() => {
            allBtns.forEach((b) => (b.style.transform = ""));
          }, 1000);
        },
      ];
      outcomes[Math.floor(Math.random() * outcomes.length)]();
    });
  });
}

// ============== FAKE FORM ==============
function setupFakeForm() {
  const nameInput = document.getElementById("fakeName");
  const colorSelect = document.getElementById("fakeColor");

  // Input trolling
  nameInput.addEventListener("input", (e) => {
    const trollResponses = [
      () => (e.target.value = e.target.value.split("").reverse().join("")),
      () => (e.target.value = e.target.value.toUpperCase()),
      () => (e.target.value = e.target.value.toLowerCase()),
      () => {}, // Sometimes do nothing
      () => {},
    ];

    if (e.target.value.length > 5 && Math.random() < 0.3) {
      trollResponses[Math.floor(Math.random() * trollResponses.length)]();
    }
  });

  // Dropdown trolling
  colorSelect.addEventListener("change", () => {
    playClickSound();

    setTimeout(() => {
      if (Math.random() < 0.5) {
        colorSelect.selectedIndex = 0;
        showAchievement("Selection reset! Pick again 😈");
      }
    }, 500);
  });

  // Form submission
  elements.fakeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    state.formSubmits++;
    incrementClick();

    checkAchievement("form_submit");

    // Chain of popups
    showPopup(
      "Processing...",
      "Please wait while we process your totally real form.",
      () => {
        setTimeout(() => {
          showPopup(
            "Are you sure?",
            "This will submit your data to... nowhere actually.",
            () => {
              setTimeout(() => {
                showPopup("Really sure?", "Like, REALLY really sure?", () => {
                  setTimeout(() => {
                    showPopup(
                      "One more time...",
                      "Just kidding! Your form was never going anywhere. 😂",
                      () => {
                        shakeScreen();
                        showRandomError();
                      }
                    );
                  }, 500);
                });
              }, 500);
            }
          );
        }, 500);
      }
    );
  });
}

// ============== RAGE QUIT ==============
function setupRageQuit() {
  elements.rageQuitBtn.addEventListener("click", () => {
    state.rageQuitAttempts++;
    incrementClick();

    checkAchievement("rage_quit_1");

    const responses = [
      () => {
        elements.rageQuitBtn.textContent = "Nice try! 😂";
        setTimeout(() => {
          elements.rageQuitBtn.textContent = "🚪 RAGE QUIT 🚪";
        }, 1500);
      },
      () => {
        shakeScreen();
        showAchievement("Rage Quit Failed! The button is broken 😈");
      },
      () => {
        showPopup("Are you leaving?", "But we were having so much fun!", () => {
          showPopup(
            "Please stay!",
            "I promise it gets better... (it doesn't)",
            () => {
              showPopup("Fine, go!", "Just kidding, you can't! 🚫", () => {
                playErrorSound();
              });
            }
          );
        });
      },
      () => {
        // Fake closing animation
        document.body.style.transform = "scale(0.9)";
        document.body.style.opacity = "0.5";

        setTimeout(() => {
          document.body.style.transform = "";
          document.body.style.opacity = "";
          showAchievement("SIKE! You thought you could leave? 😂");
          playErrorSound();
        }, 1000);
      },
      () => {
        showRandomError();
        elements.rageQuitBtn.textContent = "ERROR! 🔥";
        setTimeout(() => {
          elements.rageQuitBtn.textContent = "🚪 RAGE QUIT 🚪";
        }, 2000);
      },
    ];

    responses[Math.floor(Math.random() * responses.length)]();

    // After many attempts, offer victory
    if (
      state.rageQuitAttempts >= 5 &&
      state.interactionCount >= state.victoryThreshold
    ) {
      setTimeout(() => {
        showVictory();
      }, 2000);
    }
  });
}

// ============== POPUPS ==============
function setupPopups() {
  elements.popupYes.addEventListener("click", () => {
    state.popupChain++;
    incrementClick();

    if (state.popupChain < 5) {
      // More popups!
      const questions = [
        "Are you REALLY sure?",
        "One more confirmation...",
        "Final answer?",
        "Absolutely certain?",
        "No take-backs!",
      ];

      elements.popupTitle.textContent =
        questions[state.popupChain - 1] || "Still sure?";
      elements.popupMessage.textContent = `Confirmation ${state.popupChain} of ∞`;

      // Animate
      elements.popupOverlay.querySelector(".popup-card").style.animation =
        "none";
      setTimeout(() => {
        elements.popupOverlay.querySelector(".popup-card").style.animation =
          "popupBounce 0.5s ease-out";
      }, 10);
    } else {
      // Finally close... or show error
      hidePopup();
      state.popupChain = 0;
      checkAchievement("popup_hell");

      if (Math.random() < 0.5) {
        setTimeout(showRandomError, 500);
      } else {
        showAchievement(getSarcasticMessage());
      }
    }
  });

  elements.popupNo.addEventListener("click", () => {
    incrementClick();
    hidePopup();
    state.popupChain = 0;

    // Punish for saying no
    const punishments = [
      () => showAchievement("You said no? That hurts 😢"),
      () => shakeScreen(),
      () => {
        setTimeout(
          () => showPopup("Changed your mind?", "Too bad, the popup is back!"),
          500
        );
      },
    ];
    punishments[Math.floor(Math.random() * punishments.length)]();
  });
}

function showPopup(title, message, callback = null) {
  elements.popupTitle.textContent = title;
  elements.popupMessage.textContent = message;
  elements.popupOverlay.classList.add("active");
  playClickSound();

  if (callback) {
    elements.popupYes.onclick = () => {
      hidePopup();
      callback();
    };
  }
}

function hidePopup() {
  elements.popupOverlay.classList.remove("active");
}

// ============== ERROR POPUP ==============
function setupErrorPopup() {
  elements.errorBtn.addEventListener("click", () => {
    incrementClick();

    // Sometimes it doesn't close
    if (Math.random() < 0.3) {
      elements.errorBtn.textContent = "Still broken! 😂";
      shakeScreen();
      setTimeout(() => {
        elements.errorBtn.textContent = "OK (this won't help)";
        elements.errorOverlay.classList.remove("active");
      }, 1500);
    } else {
      elements.errorOverlay.classList.remove("active");
    }
  });
}

function showRandomError() {
  const error =
    state.errorMessages[Math.floor(Math.random() * state.errorMessages.length)];
  elements.errorTitle.textContent = error.title;
  elements.errorMessage.textContent = error.message;
  elements.errorOverlay.classList.add("active");
  playErrorSound();
}

// ============== VICTORY SCREEN ==============
function setupVictoryScreen() {
  elements.restartBtn.addEventListener("click", () => {
    // Fake restart
    playErrorSound();
    elements.restartBtn.textContent = "Nice try! 😂";

    setTimeout(() => {
      elements.restartBtn.textContent = "OK fine, refreshing...";

      setTimeout(() => {
        elements.restartBtn.textContent = "Just kidding! 🤷";

        setTimeout(() => {
          elements.restartBtn.textContent = "🔄 Do It Again (Why Would You?)";
        }, 1500);
      }, 1500);
    }, 1000);
  });
}

function showVictory() {
  const userName = state.currentUser === "rohit" ? "Rohit Nehra" : "Ankit";

  elements.victorySubtitle.textContent = `${userName}, You Survived This Website!`;

  elements.victoryStats.innerHTML = `
        <div>Total Clicks: ${state.clicks}</div>
        <div>Dodge Attempts: ${state.dodgeAttempts}</div>
        <div>Loading Resets: ${state.loadingResets}</div>
        <div>Rage Quits: ${state.rageQuitAttempts}</div>
        <div>Patience Level: ${state.patience}%</div>
        <div>Frustration: ${state.frustration}%</div>
    `;

  elements.victoryScreen.classList.add("active");
  playSuccessSound();

  // Spawn confetti
  spawnConfetti();
}

function spawnConfetti() {
  const colors = [
    "#ff006e",
    "#00f5ff",
    "#39ff14",
    "#fff700",
    "#bf00ff",
    "#ffd700",
  ];

  for (let i = 0; i < 100; i++) {
    setTimeout(() => {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.left = Math.random() * 100 + "%";
      confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDuration = Math.random() * 2 + 2 + "s";
      confetti.style.width = Math.random() * 10 + 5 + "px";
      confetti.style.height = confetti.style.width;
      confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";

      elements.confettiContainer.appendChild(confetti);

      setTimeout(() => confetti.remove(), 4000);
    }, i * 30);
  }
}

// ============== ACHIEVEMENTS ==============
function showAchievement(text) {
  const achievement = document.createElement("div");
  achievement.className = "achievement";
  achievement.innerHTML = `
        <span class="achievement-icon">🏆</span>
        <span class="achievement-text">${text}</span>
    `;

  elements.achievementContainer.appendChild(achievement);
  playSuccessSound();

  // Remove after animation
  setTimeout(() => achievement.remove(), 3500);
}

function checkAchievement(id) {
  if (state.achievements.includes(id)) return;

  const achievement = state.achievementsList.find((a) => a.id === id);
  if (!achievement) return;

  // Check threshold based on id
  let count = 0;
  switch (id) {
    case "first_click":
      count = state.clicks;
      break;
    case "ten_clicks":
      count = state.clicks;
      break;
    case "clicks_50":
      count = state.clicks;
      break;
    case "patience_25":
      count = 100 - state.patience;
      break;
    case "dodge_5":
      count = state.dodgeAttempts;
      break;
    case "loading_reset":
      count = state.loadingResets;
      break;
    case "rage_quit_1":
      count = state.rageQuitAttempts;
      break;
    case "masochist":
      count = state.interactionCount;
      break;
    default:
      count = 1;
      break;
  }

  if (count >= achievement.threshold) {
    state.achievements.push(id);
    showAchievement(achievement.text);
  }
}

// ============== GLOBAL CLICK TRACKING ==============
function setupGlobalClickTracking() {
  document.addEventListener("click", () => {
    state.interactionCount++;

    // Random events on any click
    if (Math.random() < 0.05) {
      shakeScreen();
    }

    // Check for victory condition
    if (
      state.interactionCount >= state.victoryThreshold &&
      state.rageQuitAttempts >= 3
    ) {
      // Don't auto-show, let rage quit trigger it
    }
  });
}

function incrementClick() {
  state.clicks++;
  state.interactionCount++;
  state.frustration = Math.min(100, state.frustration + 2);
  state.patience = Math.max(0, state.patience - 1);

  updateStats();

  // Check click-based achievements
  checkAchievement("first_click");
  checkAchievement("ten_clicks");
  checkAchievement("clicks_50");

  if (100 - state.patience >= 25) {
    checkAchievement("patience_25");
  }

  if (state.interactionCount >= 100) {
    checkAchievement("masochist");
  }
}

function updateStats() {
  elements.clickCount.textContent = state.clicks;
  elements.patienceLevel.textContent = state.patience + "%";
  elements.frustrationLevel.textContent = state.frustration + "%";

  // Change patience color based on level
  if (state.patience < 30) {
    elements.patienceLevel.style.color = "#ff4444";
  } else if (state.patience < 60) {
    elements.patienceLevel.style.color = "#ffaa00";
  }
}

// ============== UTILITY FUNCTIONS ==============
function shakeScreen() {
  document.body.classList.add("shake");
  setTimeout(() => document.body.classList.remove("shake"), 500);
}

function getSarcasticMessage() {
  const messages =
    state.sarcasticMessages[state.currentUser] || state.sarcasticMessages.rohit;
  return messages[Math.floor(Math.random() * messages.length)];
}

// ============== EXTRA CHAOS ==============

// Random drift text content
setInterval(() => {
  const driftMessages = [
    "This is very important information that you definitely need to read...",
    "You're doing great! Nothing is happening though.",
    "Almost done... just kidding.",
    "If you can read this, you're too patient.",
    "Yes, this is on purpose. You're welcome.",
    `Hey ${
      state.currentUser === "rohit" ? "Rohit Nehra" : "Ankit"
    }, this is for you! 😈`,
    "Govind is probably laughing right now...",
    "The exit is... wait, there is no exit.",
    "Breaking the 4th wall: You're being trolled.",
    "Why are you still reading this?",
  ];

  if (elements.driftText) {
    elements.driftText.textContent =
      driftMessages[Math.floor(Math.random() * driftMessages.length)];
  }
}, 10000);

// Random glitch effects
setInterval(() => {
  if (Math.random() < 0.1 && state.currentUser) {
    const elements = document.querySelectorAll(".section");
    const randomElement = elements[Math.floor(Math.random() * elements.length)];
    if (randomElement) {
      randomElement.classList.add("glitch");
      setTimeout(() => randomElement.classList.remove("glitch"), 300);
    }
  }
}, 5000);

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A

document.addEventListener("keydown", (e) => {
  konamiCode.push(e.keyCode);
  konamiCode = konamiCode.slice(-10);

  if (konamiCode.toString() === konamiSequence.toString()) {
    showAchievement("🎮 KONAMI CODE! You're a true gamer!");
    spawnConfetti();
    playSuccessSound();
  }
});

// ============== NEW CHAOS FEATURES ==============

// SLOT MACHINE
const slotSymbols = [
  "🍎",
  "🍋",
  "🍒",
  "💎",
  "7️⃣",
  "🎰",
  "💰",
  "⭐",
  "🔔",
  "🍀",
];
const slotResults = [
  "So close! But not really.",
  "You lost! Shocking, right?",
  "Better luck never!",
  "Jackpot! Just kidding 😂",
  "Almost won! (No you didn't)",
  "The house always wins!",
  "Try again! (It won't help)",
  "You're cursed! 🎃",
];

function setupSlotMachine() {
  const spinBtn = document.getElementById("slotSpinBtn");
  const slot1 = document.getElementById("slot1");
  const slot2 = document.getElementById("slot2");
  const slot3 = document.getElementById("slot3");
  const result = document.getElementById("slotResult");

  if (!spinBtn) return;

  spinBtn.addEventListener("click", () => {
    incrementClick();
    playClickSound();

    // Start spinning
    [slot1, slot2, slot3].forEach((slot) => slot.classList.add("spinning"));
    spinBtn.disabled = true;
    spinBtn.textContent = "🎰 SPINNING...";

    // Spin animation
    let spins = 0;
    const spinInterval = setInterval(() => {
      slot1.textContent =
        slotSymbols[Math.floor(Math.random() * slotSymbols.length)];
      slot2.textContent =
        slotSymbols[Math.floor(Math.random() * slotSymbols.length)];
      slot3.textContent =
        slotSymbols[Math.floor(Math.random() * slotSymbols.length)];
      spins++;

      if (spins > 20) {
        clearInterval(spinInterval);
        [slot1, slot2, slot3].forEach((slot) =>
          slot.classList.remove("spinning")
        );
        spinBtn.disabled = false;
        spinBtn.textContent = "🎰 SPIN!";

        // Always lose (almost)
        const finalSymbols = [
          slotSymbols[Math.floor(Math.random() * slotSymbols.length)],
          slotSymbols[Math.floor(Math.random() * slotSymbols.length)],
          slotSymbols[Math.floor(Math.random() * slotSymbols.length)],
        ];

        // Make sure they never match
        if (
          finalSymbols[0] === finalSymbols[1] &&
          finalSymbols[1] === finalSymbols[2]
        ) {
          finalSymbols[2] =
            slotSymbols[
              (slotSymbols.indexOf(finalSymbols[2]) + 1) % slotSymbols.length
            ];
        }

        slot1.textContent = finalSymbols[0];
        slot2.textContent = finalSymbols[1];
        slot3.textContent = finalSymbols[2];

        result.textContent =
          slotResults[Math.floor(Math.random() * slotResults.length)];

        // Random chaos after spin
        if (Math.random() < 0.3) {
          setTimeout(showRandomError, 500);
        }

        showAchievement("🎰 Gambler's Ruin! You wasted a spin!");
      }
    }, 100);
  });
}

// BSOD - Blue Screen of Death
function showBSOD() {
  const bsod = document.getElementById("bsodScreen");
  const progress = document.getElementById("bsodProgress");

  if (!bsod) return;

  bsod.classList.add("active");
  playErrorSound();

  let percent = 0;
  const progressInterval = setInterval(() => {
    percent += Math.floor(Math.random() * 5) + 1;
    if (percent > 100) percent = 100;
    progress.textContent = percent;

    if (percent >= 100) {
      clearInterval(progressInterval);
    }
  }, 200);

  bsod.addEventListener(
    "click",
    () => {
      bsod.classList.remove("active");
      showAchievement("💻 BSOD Survivor! You didn't panic!");
    },
    { once: true }
  );
}

// Trigger BSOD randomly
function setupBSOD() {
  // Random chance to show BSOD after certain interactions
  setInterval(() => {
    if (
      state.currentUser &&
      state.interactionCount > 20 &&
      Math.random() < 0.05
    ) {
      showBSOD();
    }
  }, 30000);
}

// FLASHLIGHT MODE
let flashlightActive = false;

function setupFlashlight() {
  const btn = document.getElementById("flashlightBtn");
  const overlay = document.getElementById("flashlightOverlay");

  if (!btn || !overlay) return;

  btn.addEventListener("click", () => {
    incrementClick();
    flashlightActive = !flashlightActive;
    overlay.classList.toggle("active", flashlightActive);

    if (flashlightActive) {
      btn.textContent = "🔦 Deactivate Flashlight";
      showAchievement("🔦 Darkness Mode! Good luck seeing!");
      document.body.classList.add("tilted"); // Also add screen tilt for extra chaos
    } else {
      btn.textContent = "🔦 Activate Flashlight";
      document.body.classList.remove("tilted");
    }
  });

  // Follow mouse for flashlight effect
  document.addEventListener("mousemove", (e) => {
    if (flashlightActive) {
      overlay.style.setProperty("--x", e.clientX + "px");
      overlay.style.setProperty("--y", e.clientY + "px");
    }
  });
}

// FAKE PASSWORD
const wrongPasswordResponses = [
  "Wrong! Try again 😈",
  "Nope! That's not it!",
  "Incorrect! (There is no correct one)",
  "Access Denied! Forever!",
  "Nice try! But no.",
  "Password rejected by the universe!",
  "Error: This password doesn't exist!",
  "Ha! You thought that would work?",
  "That password hurt my feelings 😢",
  "Govind says: No access for you!",
];

function setupFakePassword() {
  const btn = document.getElementById("passwordBtn");
  const input = document.getElementById("fakePassword");
  const hint = document.getElementById("passwordHint");

  if (!btn || !input) return;

  btn.addEventListener("click", () => {
    incrementClick();
    playErrorSound();
    shakeScreen();

    hint.textContent =
      wrongPasswordResponses[
        Math.floor(Math.random() * wrongPasswordResponses.length)
      ];
    hint.style.color = "#ff4444";
    input.value = "";

    // Random punishment
    if (Math.random() < 0.3) {
      showFakeNotification(
        "🔐 Security Alert!",
        "Too many failed attempts. Webcam activated! 📷"
      );
    }

    showAchievement("🔐 Access Denied! There is no password!");
  });

  // Keyboard chaos - add random emojis while typing
  input.addEventListener("input", (e) => {
    if (Math.random() < 0.2) {
      const emojis = ["😈", "🤡", "💀", "🎭", "🔥", "⚡", "🌈"];
      e.target.value += emojis[Math.floor(Math.random() * emojis.length)];
    }
  });
}

// RICK ROLL
function setupRickRoll() {
  const btn = document.getElementById("rickrollBtn");

  if (!btn) return;

  btn.addEventListener("click", () => {
    incrementClick();
    playSuccessSound();

    showPopup(
      "🎵 Loading your free music...",
      "Get ready for the best song ever!",
      () => {
        // Open Rick Roll in new tab
        window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
        showAchievement("🎵 RICK ROLLED! You fell for it!");

        setTimeout(() => {
          showFakeNotification(
            "🎶 Now Playing:",
            "Never Gonna Give You Up - Rick Astley"
          );
        }, 1000);
      }
    );
  });
}

// FAKE NOTIFICATIONS
const fakeNotifications = [
  {
    icon: "📸",
    title: "Screenshot Captured!",
    message: "We took a photo of your face 📷",
  },
  {
    icon: "🔔",
    title: "New Message!",
    message: "Govind says: Having fun yet? 😈",
  },
  { icon: "⚠️", title: "Warning!", message: "Your patience is running low!" },
  {
    icon: "📱",
    title: "System Alert!",
    message: "Too much clicking detected!",
  },
  {
    icon: "🎮",
    title: "Achievement Nearby!",
    message: "Keep clicking for nothing!",
  },
  {
    icon: "💾",
    title: "Auto-Save Failed!",
    message: "Your progress is gone forever!",
  },
  {
    icon: "🔋",
    title: "Battery Low!",
    message: "Just kidding, your battery is fine.",
  },
  { icon: "📧", title: "New Email!", message: "Subject: You've been pranked!" },
];

function showFakeNotification(title, message) {
  const notification = document.getElementById("fakeNotification");
  const titleEl = document.getElementById("notificationTitle");
  const messageEl = document.getElementById("notificationMessage");
  const closeBtn = document.getElementById("notificationClose");

  if (!notification) return;

  titleEl.textContent = title || "Notification";
  messageEl.textContent = message || "Something happened!";

  notification.classList.add("active");
  playClickSound();

  // Auto-hide after 5 seconds
  setTimeout(() => {
    notification.classList.remove("active");
  }, 5000);

  closeBtn.onclick = () => {
    notification.classList.remove("active");
    incrementClick();
  };
}

function setupRandomNotifications() {
  setInterval(() => {
    if (state.currentUser && Math.random() < 0.1) {
      const notif =
        fakeNotifications[Math.floor(Math.random() * fakeNotifications.length)];
      showFakeNotification(notif.title, notif.message);
    }
  }, 20000);
}

// CURSOR INVERSION
let cursorInverted = false;
let invertedCursorDot = null;

function setupCursorInversion() {
  // Create inverted cursor dot
  invertedCursorDot = document.createElement("div");
  invertedCursorDot.className = "inverted-cursor-dot";
  document.body.appendChild(invertedCursorDot);

  // Random chance to invert cursor
  setInterval(() => {
    if (
      state.currentUser &&
      state.interactionCount > 30 &&
      Math.random() < 0.03
    ) {
      toggleCursorInversion();
    }
  }, 15000);
}

function toggleCursorInversion() {
  cursorInverted = !cursorInverted;
  document.body.classList.toggle("inverted-cursor", cursorInverted);

  if (cursorInverted) {
    showAchievement("🔄 Cursor Inverted! Good luck navigating!");
    playAnnoyingSound();

    // Auto-disable after 10 seconds
    setTimeout(() => {
      cursorInverted = false;
      document.body.classList.remove("inverted-cursor");
    }, 10000);
  }
}

// Inverted mouse movement
document.addEventListener("mousemove", (e) => {
  if (cursorInverted && invertedCursorDot) {
    // Move cursor to opposite position
    const invertedX = window.innerWidth - e.clientX;
    const invertedY = window.innerHeight - e.clientY;
    invertedCursorDot.style.left = invertedX + "px";
    invertedCursorDot.style.top = invertedY + "px";
  }
});

// SCREEN TILT
function setupScreenTilt() {
  // Random screen tilt
  setInterval(() => {
    if (
      state.currentUser &&
      state.interactionCount > 40 &&
      Math.random() < 0.05
    ) {
      document.body.classList.add("tilted");
      showAchievement("🌀 Screen Tilting! Hold on tight!");

      setTimeout(() => {
        document.body.classList.remove("tilted");
      }, 15000);
    }
  }, 25000);
}

// Initialize all new features
function initNewFeatures() {
  setupSlotMachine();
  setupBSOD();
  setupFlashlight();
  setupFakePassword();
  setupRickRoll();
  setupRandomNotifications();
  setupCursorInversion();
  setupScreenTilt();
}

// ============== ORIGINAL INIT ==============

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  init();
  initNewFeatures();
});

// Start immediately if DOM is already ready
if (document.readyState !== "loading") {
  init();
  initNewFeatures();
}
