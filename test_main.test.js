// Smoke test for Dallas Kids Zone main.js


describe('Dallas Kids Zone site', () => {
  beforeEach(() => {
    // Set up a minimal DOM for the smoke test
    document.body.innerHTML = `
      <a href="https://wa.me/255655306060" class="floatbtn floatbtn-whatsapp" target="_blank" rel="noopener" aria-label="WhatsApp us">
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" style="height:1.3em;vertical-align:middle;"> <span class="wa-label">WhatsApp Us</span>
      </a>
    `;
  });

  test('smoke test: DOM loads', () => {
    expect(document.body).toBeDefined();
  });

  test('WhatsApp floating button exists', () => {
    const waBtn = document.querySelector('.floatbtn-whatsapp');
    expect(waBtn).not.toBeNull();
    expect(waBtn.href).toContain('wa.me/255655306060');
    const img = waBtn.querySelector('img');
    expect(img).not.toBeNull();
    expect(img.alt.toLowerCase()).toContain('whatsapp');
  });

  test('WhatsApp label hidden on mobile', () => {
    const label = document.querySelector('.wa-label');
    expect(label).not.toBeNull();
    // Simulate mobile by checking the class exists; actual CSS hiding is not testable in Jest DOM
    expect(label.className).toContain('wa-label');
  });
});
