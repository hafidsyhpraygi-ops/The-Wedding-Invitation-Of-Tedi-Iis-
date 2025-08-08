document.addEventListener("DOMContentLoaded", () => {
  let timer_ = 1754893200; // Unix timestamp
  let flipdown = new FlipDown(timer_);
  flipdown.start();
  flipdown.ifEnded(() => {
    document.querySelector(".flipdown").innerHTML = `<h2>Timer end</h2>`;
  });
});

function scrollToTop() {
  const container = document.getElementById("submittedData");
  container.scrollTo({
    top: -1000,
  });
}

const submittedDataDiv = document.getElementById("submittedData");

submittedDataDiv.innerHTML = "<p>Loading...</p>";

(async () => {
  const res = await fetch(
    "https://script.google.com/macros/s/AKfycbywt1pcoD1jcTOzJeJOM_Ng2kHpVavBge2anNYE5XFElAV-RttfGLZBV882qtIklF4uwg/exec"
  );
  const result = await res.json();

  let html = "";

  for (let i = 0; i < result.length; i++) {
    html += `
      <div class="submitted-item">
          <h3>${result[i].nama} (${
      result[i].kehadiran === "yes"
        ? "Hadir"
        : result[i].kehadiran === "no"
        ? "Tidak Hadir"
        : "?"
    })</h3>
          <p>${result[i].ucapan}</p>
      </div>
    `;

    //   const newItem = document.createElement("div");
    //   newItem.classList.add("submitted-item");

    //   newItem.innerHTML = `
    //   <h3>${result[i].nama} (${result[i].kehadiran})</h3>
    //   <p>${result[i].ucapan}</p>
    // `;

    //   submittedDataDiv.appendChild(newItem);
  }

  submittedDataDiv.innerHTML = html;
  submittedDataDiv.scrollTo({
    left: 0,
    top: -submittedDataDiv.scrollHeight,
    behavior: "instant",
  });
})();

// const data = [
//   { name: "Bari", status: "Hadir", message: "Selamat Ya" },
//   {
//     name: "Ali",
//     status: "Tidak Hadir",
//     message:
//       "Maaf, tidak bisa hadir adansl dnalwd nasldjn sajknd lakwubd jasndjkn askjbda wiubd asjbd ajhwbd iaubsdsakj ",
//   },
//   { name: "Sara", status: "Hadir", message: "Semoga bahagia selalu" },
// ];

// for (let i = 0; i < 3; i++) {
//   const submittedDataDiv = document.getElementById("submittedData");

//   const newItem = document.createElement("div");
//   newItem.classList.add("submitted-item");

//   newItem.innerHTML = `
//     <h3>${data[i].name} (${data[i].status})</h3>
//     <p>${data[i].message}</p>
//   `;

//   submittedDataDiv.appendChild(newItem);
// }

let ngirim = false;

const form = document.getElementById("rsvpForm");
const buttonEl = document.querySelector("button[type=submit]");
const defautlButtonText = buttonEl.textContent;

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const submit = localStorage.getItem("submit");

  if (submit && Number(submit) > 2) {
    alert("maksimal hanya 3 kali untuk mengirim ucapan!");

    return;
  }

  if (ngirim) {
    return;
  }

  ngirim = true;

  if (buttonEl) {
    buttonEl.textContent = "Mengirim...";
  }

  const scriptURL =
    "https://script.google.com/macros/s/AKfycbxx2gFaS033J5Ag26vVHSbFkkoencaGDOZEYAfx9AS72QBDVS7fd8EsYo2eRTv389jLxA/exec";

  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      buttonEl.textContent = defautlButtonText;

      alert("Berhasil mengirim ucapan, terima kasih :)");

      form.reset();

      ngirim = false;

      localStorage.setItem(
        "submit",
        `${Number(submit) ? Number(submit) + 1 : 1}`
      );

      console.log("Success!", response);

      submittedDataDiv.innerHTML = "<p>Loading...</p>";

      (async () => {
        const res = await fetch(
          "https://script.google.com/macros/s/AKfycbywt1pcoD1jcTOzJeJOM_Ng2kHpVavBge2anNYE5XFElAV-RttfGLZBV882qtIklF4uwg/exec"
        );
        const result = await res.json();

        let html = "";

        for (let i = 0; i < result.length; i++) {
          html += `
            <div class="submitted-item">
                <h3>${result[i].nama} (${
            result[i].kehadiran === "yes"
              ? "Hadir"
              : result[i].kehadiran === "no"
              ? "Tidak Hadir"
              : "?"
          })</h3>
                <p>${result[i].ucapan}</p>
            </div>
          `;

          //   const newItem = document.createElement("div");
          //   newItem.classList.add("submitted-item");

          //   newItem.innerHTML = `
          //   <h3>${result[i].nama} (${result[i].kehadiran})</h3>
          //   <p>${result[i].ucapan}</p>
          // `;

          //   submittedDataDiv.appendChild(newItem);
        }

        submittedDataDiv.innerHTML = html;
        submittedDataDiv.scrollTo({
          left: 0,
          top: -submittedDataDiv.scrollHeight,
          behavior: "instant",
        });
      })();
    })
    .catch((error) => {
      ngirim = false;

      console.error("Error!", error.message);
    });

  // const name = document.getElementById("name").value;
  // const attendance = document.querySelector(
  //   'input[name="attendance"]:checked'
  // ).value;
  // const message = document.getElementById("message").value;

  // const submittedDataDiv = document.getElementById("submittedData");

  // const newItem = document.createElement("div");
  // newItem.classList.add("submitted-item");

  // newItem.innerHTML = `
  // <h3>${name} (${attendance})</h3>
  // <p>${message}</p>
  // `;

  // submittedDataDiv.appendChild(newItem);
  // document.getElementById("rsvpForm").reset();
  // scrollToTop();
});

const audio = document.getElementById("myAudio");
const playButton = document.getElementById("playButton");

playButton.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playButton.classList.add("playing");
    playButton.classList.remove("paused");
  } else {
    audio.pause();
    playButton.classList.add("paused");
    playButton.classList.remove("playing");
  }
});

let slideIndex = 1;

function showSlide(n) {
  let i;
  let slides = document.querySelectorAll(".mySlide");

  if (n > slides.length) {
    slideIndex = 1;
  } else if (n < 1) {
    slideIndex = slides.length;
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slides[slideIndex - 1].style.display = "block";
}

showSlide(slideIndex);

function plusSlide(n) {
  showSlide((slideIndex += n));
}
