/* ============================================================
   APP.JS – Sistem Persuratan RT 001
   Versi FINAL – Perihal Tambahan & Penutup Surat (default/custom)
   Tanpa Google API
   ============================================================ */

/* ----------------- RENDER UI UTAMA ----------------- */
document.getElementById("app").innerHTML = `
  <div class="max-w-7xl mx-auto space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">Sistem Persuratan RT 001</h1>
    </div>

    <div class="grid grid-cols-3 gap-6">
      
      <!-- FORM -->
      <div class="col-span-1 bg-white p-4 rounded shadow no-print">
        <h2 class="font-semibold mb-3">Form Input & Pengaturan</h2>

        <label>Template Surat</label>
        <select id="selTemplate" class="border p-2 w-full mb-3"></select>

        <label>Nomor Surat</label>
        <div class="flex gap-2 mb-3">
          <input id="fNomor" class="border p-2 w-full" />
          <button id="btnAutoNomor" class="bg-gray-200 px-3 rounded">Auto</button>
        </div>

        <label>Lampiran</label>
        <input id="fLampiran" class="border p-2 w-full mb-3" />

        <label>Perihal</label>
        <input id="fPerihal" class="border p-2 w-full mb-3" />

        <label>Ditujukan Kepada</label>
        <input id="fTujuan" class="border p-2 w-full mb-3" />

        <label>Instansi/Jabatan</label>
        <input id="fInstansi" class="border p-2 w-full mb-3" />

        <label>Hari/Tanggal Acara</label>
        <input id="fHari" class="border p-2 w-full mb-3" />

        <label>Waktu</label>
        <input id="fWaktu" class="border p-2 w-full mb-3" />

        <label>Tempat</label>
        <input id="fTempat" class="border p-2 w-full mb-3" />

        <!-- Perihal Tambahan -->
        <label>Perihal (Tambahan)</label>
        <input id="fPerihal2" class="border p-2 w-full mb-3" />

        <!-- Penutup Surat: default / custom -->
        <label>Penutup Surat</label>
        <select id="selPenutup" class="border p-2 w-full mb-3">
          <option value="default">Default</option>
          <option value="custom">Custom</option>
        </select>
        <textarea id="fPenutup" class="border p-2 w-full mb-3" rows="3" placeholder="Isi penutup custom jika dipilih"></textarea>

        <label>Isi Surat</label>
        <div id="editor" class="editor border mb-3"></div>

        <label>Upload Logo RT</label>
        <input type="file" id="fLogo" accept="image/*" class="mb-3" />
        <div id="logoPreviewWrap" class="mb-3"></div>

        <label>Nama Sekretaris</label>
        <input id="fSekretaris" class="border p-2 w-full mb-3" />

        <label>Nama Ketua RT</label>
        <input id="fKetua" class="border p-2 w-full mb-3" />

        <label>Nama Ketua RW 05</label>
        <input id="fKetuaRW" class="border p-2 w-full mb-3" />

        <button id="btnSaveDraft" class="bg-green-600 text-white px-3 py-2 rounded w-full mb-2">Simpan Draft</button>
        <button id="btnExportPDF" class="bg-blue-600 text-white px-3 py-2 rounded w-full mb-2">Export PDF</button>
        <button id="btnReset" class="bg-gray-200 px-3 py-2 rounded w-full">Reset</button>
      </div>

      <!-- PREVIEW -->
      <div class="col-span-2 bg-white p-6 rounded shadow">
        <div class="flex justify-between mb-4">
          <h2 class="font-semibold">Preview Surat</h2>
          <div>
            <button id="btnPrint" class="bg-indigo-600 text-white px-3 py-1 rounded mr-2">Print</button>
            <button id="btnDownloadHTML" class="bg-yellow-500 text-white px-3 py-1 rounded">Download HTML</button>
          </div>
        </div>

        <div id="preview" class="page">

          <div id="headerArea" class="text-center">
            <p class="font-bold text-2xl">PERUMAHAN TIARA MANTANG RT 001 RW 005</p>
            <p class="font-semibold text-xl">KELURAHAN SAGULUNG KOTA – KECAMATAN SAGULUNG</p>
            <p class="font-semibold text-xl mb-2">KOTA BATAM</p>
            <div id="logoArea" class="mt-2"></div>
          </div>

          <div class="border-b-2 border-black my-4"></div>

          <p class="text-right" id="pTanggal"></p>

          <table class="mt-4 mb-4 w-full">
            <tr><td class="w-28">Nomor</td><td>: <span id="pNomor"></span></td></tr>
            <tr><td>Lampiran</td><td>: <span id="pLampiran"></span></td></tr>
            <tr><td>Perihal</td><td>: <span id="pPerihal"></span></td></tr>
          </table>

          <!-- Perihal Tambahan -->
          <p class="font-semibold mb-2" id="pPerihal2"></p>

          <p>Kepada Yth:</p>
          <p class="font-semibold" id="pTujuan"></p>
          <p id="pInstansi"></p>
          <p class="mb-4">Di Tempat</p>

          <div id="pIsi" class="text-justify mb-4"></div>

          <table class="mt-4 mb-4 w-full">
            <tr><td>Hari/Tanggal</td><td>: <span id="pHari"></span></td></tr>
            <tr><td>Waktu</td><td>: <span id="pWaktu"></span></td></tr>
            <tr><td>Tempat</td><td>: <span id="pTempat"></span></td></tr>
          </table>

          <!-- Penutup -->
          <div id="pPenutup" class="text-justify mb-6"></div>

          <div class="mt-10 w-full text-center">
            <p>Hormat kami,</p>
          </div>

          <div class="mt-6 grid grid-cols-2">
            <div class="text-center">
              <p>Ketua RT 001</p><br><br>
              <p class="font-semibold" id="pKetua"></p>
            </div>

            <div class="text-center">
              <p>Sekretaris RT 001</p><br><br>
              <p class="font-semibold" id="pSekretaris"></p>
            </div>
          </div>

          <div class="mt-10 text-center">
            <p>Mengetahui,</p>
            <p>Ketua RW 05</p><br><br>
            <p class="font-semibold" id="pKetuaRW"></p>
          </div>

        </div>

        <h3 class="font-semibold mt-6 mb-2">Arsip Draft</h3>
        <div id="draftList"></div>
      </div>

    </div>
  </div>
`;

/* ----------------- TEMPLATES ----------------- */
const templates = {
  undangan: {
    label: "Undangan - Rapat Warga RT 001",
    perihal: "Undangan Rapat Warga",
   prefix : "UND",
    tujuan: "Warga RT 001 Perum. Tiara Mantang",
    instansi: "",
    hari: "hari, Tanggal ",
    waktu: "Pukul 00.00 WIB",
    tempat: "Gang Blok B–C, Perumahan Tiara Mantang",
    isi: "<p>Dalam rangka pembahasan ............., kami mengundang Bapak/Ibu untuk hadir.</p>"
  },
  pemberitahuan: {
    label: "Pemberitahuan kegiatan",
    perihal: " Kegitan RT 001",
     prefix : "PMB",
    tujuan: "Seluruh Warga RT 001",
    instansi: "",
    hari: "hari, tanggal",
    waktu: "Pukul 00.00 WIB",
    tempat: "Fasum RT 001",
    isi: "<p>Dengan ini kami mengundang seluruh warga dalam kegiatan..... yang diadakan RT 001.</p>"
  },
  domisili: {
    label: "Surat Keterangan Domisili",
    perihal: "Surat Keterangan Domisili",
    isi: "<p>Yang bertanda tangan di bawah ini menerangkan bahwa:<br>Nama: ...<br>Alamat: ...<br>Benar berdomisili di RT 001 RW 005 Perumahan Tiara Mantang.</p>"
  }
};

/* ----------------- DROPDOWN TEMPLATE ----------------- */
function populateTemplateDropdown() {
  const sel = document.getElementById("selTemplate");
  Object.keys(templates).forEach(key => {
    const opt = document.createElement("option");
    opt.value = key;
    opt.text = templates[key].label;
    sel.appendChild(opt);
  });
}
populateTemplateDropdown();

/* ----------------- INIT QUILL ----------------- */
const quill = new Quill("#editor", { theme: "snow" });

function applyTemplate() {
  const t = templates[document.getElementById("selTemplate").value];
  document.getElementById("fPerihal").value = t.perihal || "";
  document.getElementById("fTujuan").value = t.tujuan || "";
  document.getElementById("fInstansi").value = t.instansi || "";
  document.getElementById("fHari").value = t.hari || "";
  document.getElementById("fWaktu").value = t.waktu || "";
  document.getElementById("fTempat").value = t.tempat || "";
  quill.root.innerHTML = t.isi || "";
  updatePreview();
}
document.getElementById("selTemplate").addEventListener("change", applyTemplate);
applyTemplate();

/* ----------------- TANGGAL OTOMATIS ----------------- */
function setTanggal() {
  const t = new Date();
  const ops = { day: "numeric", month: "long", year: "numeric" };
  document.getElementById("pTanggal").innerText =
    "Batam, " + t.toLocaleDateString("id-ID", ops);
}
setTanggal();

/* ----------------- LOGO HANDLER ----------------- */
function renderLogo() {
  const data = localStorage.getItem("rt_logo");
  const area = document.getElementById("logoArea");
  const wrap = document.getElementById("logoPreviewWrap");
  if (!data) { area.innerHTML = ""; wrap.innerHTML = ""; return; }
  const img = `<img src="${data}" class="logo-preview">`;
  area.innerHTML = img; wrap.innerHTML = img;
}
document.getElementById("fLogo").addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    localStorage.setItem("rt_logo", ev.target.result);
    renderLogo();
  };
  reader.readAsDataURL(file);
});
renderLogo();

/* ----------------- AUTO NOMOR ----------------- */
function genNomor() {
  let c = parseInt(localStorage.getItem("rt_nomor_counter") || "0");
  c++;
  localStorage.setItem("rt_nomor_counter", c);

  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();

  const templateKey = document.getElementById("selTemplate").value;
  const prefix = templates[templateKey].prefix || "XXX";

  // FORMAT BARU: PREFIX/NOMOR/RT001/BULAN/TAHUN
  const nomor = `${prefix}/${String(c).padStart(3, "0")}/RT001/${mm}/${yyyy}`;
  document.getElementById("fNomor").value = nomor;
  updatePreview();
}
document.getElementById("btnAutoNomor").addEventListener("click", genNomor);

/* ----------------- DRAFTS ----------------- */
function collectFormData() {
  return {
    nomor: document.getElementById("fNomor").value,
    lampiran: document.getElementById("fLampiran").value,
    perihal: document.getElementById("fPerihal").value,
    perihal2: document.getElementById("fPerihal2").value,
    tujuan: document.getElementById("fTujuan").value,
    instansi: document.getElementById("fInstansi").value,
    hari: document.getElementById("fHari").value,
    waktu: document.getElementById("fWaktu").value,
    tempat: document.getElementById("fTempat").value,
    penutupMode: document.getElementById("selPenutup").value,
    penutupText: document.getElementById("fPenutup").value,
    isi: quill.root.innerHTML,
    sekretaris: document.getElementById("fSekretaris").value,
    ketua: document.getElementById("fKetua").value,
    ketuaRW: document.getElementById("fKetuaRW").value,
    logo: localStorage.getItem("rt_logo") || null,
    updated: new Date().toISOString()
  };
}

function saveDraft() {
  const arr = JSON.parse(localStorage.getItem("rt_drafts") || "[]");
  const data = collectFormData();
  data.id = Date.now();
  arr.unshift(data);
  localStorage.setItem("rt_drafts", JSON.stringify(arr));
  renderDraftList();
  alert("Draft berhasil disimpan.");
}
document.getElementById("btnSaveDraft").addEventListener("click", saveDraft);

function renderDraftList() {
  const list = document.getElementById("draftList");
  const drafts = JSON.parse(localStorage.getItem("rt_drafts") || "[]");
  if (!drafts.length) { list.innerHTML = `<p class="text-sm text-gray-500">Belum ada draft tersimpan.</p>`; return; }
  list.innerHTML = "";
  drafts.forEach(d => {
    const item = document.createElement("div");
    item.className = "draft-item";
    item.innerHTML = `
      <div>
        <div class="font-semibold">${d.nomor || "(tanpa nomor)"} - ${d.perihal}</div>
        <div class="text-sm">${new Date(d.updated).toLocaleString()}</div>
      </div>
      <div>
        <button onclick="loadDraft(${d.id})" class="border px-2 py-1 rounded mr-2">Buka</button>
        <button onclick="deleteDraft(${d.id})" class="bg-red-600 text-white px-2 py-1 rounded">Hapus</button>
      </div>
    `;
    list.appendChild(item);
  });
}
renderDraftList();

window.loadDraft = function (id) {
  const arr = JSON.parse(localStorage.getItem("rt_drafts") || "[]");
  const d = arr.find(x => x.id === id);
  if (!d) return;
  document.getElementById("fNomor").value = d.nomor || "";
  document.getElementById("fLampiran").value = d.lampiran || "";
  document.getElementById("fPerihal").value = d.perihal || "";
  document.getElementById("fPerihal2").value = d.perihal2 || "";
  document.getElementById("fTujuan").value = d.tujuan || "";
  document.getElementById("fInstansi").value = d.instansi || "";
  document.getElementById("fHari").value = d.hari || "";
  document.getElementById("fWaktu").value = d.waktu || "";
  document.getElementById("fTempat").value = d.tempat || "";
  document.getElementById("selPenutup").value = d.penutupMode || "default";
  document.getElementById("fPenutup").value = d.penutupText || "";
  quill.root.innerHTML = d.isi || "";
  document.getElementById("fSekretaris").value = d.sekretaris || "";
  document.getElementById("fKetua").value = d.ketua || "";
  document.getElementById("fKetuaRW").value = d.ketuaRW || "";
  if (d.logo) localStorage.setItem("rt_logo", d.logo);
  renderLogo();
  updatePreview();
};

window.deleteDraft = function (id) {
  let arr = JSON.parse(localStorage.getItem("rt_drafts") || "[]");
  arr = arr.filter(x => x.id !== id);
  localStorage.setItem("rt_drafts", JSON.stringify(arr));
  renderDraftList();
};

/* ----------------- UPDATE PREVIEW ----------------- */
function updatePreview() {
  const ids = [
    "fNomor","fLampiran","fPerihal","fTujuan","fInstansi","fHari","fWaktu","fTempat",
    "fSekretaris","fKetua","fKetuaRW"
  ];
  ids.forEach(id => {
    const out = "p" + id.substring(1);
    const el = document.getElementById(out);
    if (!el) return;
    const val = document.getElementById(id).value || "";
    el.innerText = val;
  });

  // perihal tambahan
  document.getElementById("pPerihal2").innerText = document.getElementById("fPerihal2").value || "";

  // penutup
  const mode = document.getElementById("selPenutup").value;
  const custom = document.getElementById("fPenutup").value || "";
  if (mode === "default") {
    document.getElementById("pPenutup").innerText =
      "Demikian surat ini kami sampaikan, atas perhatian dan kerja samanya kami ucapkan terima kasih.";
  } else {
    document.getElementById("pPenutup").innerText = custom;
  }

  // isi surat (quill)
  document.getElementById("pIsi").innerHTML = quill.root.innerHTML || "";
}

/* listeners */
["input","change"].forEach(evt => {
  // listen input/select/textarea
  document.querySelectorAll("input, textarea, select").forEach(el => {
    el.addEventListener(evt, updatePreview);
  });
});
quill.on("text-change", updatePreview);

/* ----------------- EXPORT PDF ----------------- */
document.getElementById("btnExportPDF").addEventListener("click", async () => {
  const el = document.getElementById("preview");
  // temporarily remove focus outlines that could affect rendering
  document.activeElement.blur && document.activeElement.blur();
  const canvas = await html2canvas(el, { scale: 2 });
  const img = canvas.toDataURL("image/png");

  const pdf = new jspdf.jsPDF("p", "mm", "a4");
  const width = pdf.internal.pageSize.getWidth();
  const height = (canvas.height * width) / canvas.width;
  pdf.addImage(img, "PNG", 0, 0, width, height);
  pdf.save((document.getElementById("fNomor").value || "surat") + ".pdf");
});

/* ----------------- PRINT ----------------- */
document.getElementById("btnPrint").addEventListener("click", async () => {
  const el = document.getElementById("preview");

  // Render gambar surat
  const canvas = await html2canvas(el, { scale: 2 });
  const img = canvas.toDataURL("image/png");

  // Buka tab baru
  const printWindow = window.open("", "_blank");

  printWindow.document.write(`
    <html>
      <head>
        <title>Cetak Surat</title>
        <style>
          body { margin:0; padding:0; }
          img { width: 100%; }
        </style>
      </head>
      <body>
        <img src="${img}">
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();

  // Cetak otomatis setelah gambar dimuat
  printWindow.onload = () => {
    printWindow.print();
    printWindow.close();
  };
});

/* ----------------- DOWNLOAD HTML ----------------- */
document.getElementById("btnDownloadHTML").addEventListener("click", () => {
  const html = document.getElementById("preview").outerHTML;
  const blob = new Blob([`<!doctype html><html><head><meta charset='utf-8'></head><body>${html}</body></html>`], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = (document.getElementById("fNomor").value || "surat") + ".html"; a.click(); URL.revokeObjectURL(url);
});

/* ----------------- RESET ----------------- */
document.getElementById("btnReset").addEventListener("click", () => {
  localStorage.removeItem("rt_logo");
  document.querySelectorAll("input, textarea, select").forEach(i => { if (i.tagName.toLowerCase() === 'input') i.value = ""; else if (i.tagName.toLowerCase()==='textarea') i.value = ""; else i.value = "default"; });
  quill.root.innerHTML = "";
  renderLogo();
  updatePreview();
});

/* ----------------- INIT ----------------- */
updatePreview();


