/**
 * BIGnateX — Site Engine (WhatsApp Only Edition)
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. Central Configuration (WhatsApp Only)
  // ==========================================
  const isLocalDev = window.location.hostname === 'localhost' || 
                     window.location.hostname === '127.0.0.1' || 
                     window.location.protocol === 'file:';

  const CONFIG = {
    whatsappNumber: "2347065052246",
    whatsappDisplay: "+234 706 505 2246",
    whatsappLink: "https://wa.me/2347065052246?text=Hello%20BIGnateX,%20I'm%20interested%20in%20registering%20for%20the%20Frontend%20Web%20Development%20Course.%20Please%20send%20me%20the%20registration%20details.",
    defaultLiveUrl: (!isLocalDev && window.location.origin) 
      ? window.location.origin 
      : "https://bignatex.com",
    coursePrice: "₦15,000",
    flyerPath: "assets/flyer.png",
  };

  // ==========================================
  // 2. Toast Notifications
  // ==========================================
  const toast = document.getElementById('toast');
  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3800);
  };

  // ==========================================
  // 3. Highlight Current Page in Navigation
  // ==========================================
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinksList = document.querySelectorAll('.nav-link');
  navLinksList.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Mobile Nav Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });
  }

  // ==========================================
  // 4. Promotional Caption Builder (Includes Number)
  // ==========================================
  const getFullCaption = () => {
    return `Want to learn how to build websites from scratch?\n\nJoin BIGnateX Frontend Web Development Course and start your journey into tech.\n\nLearn HTML, CSS, JavaScript, responsive design, React and more.\n\nCourse Fee: ${CONFIG.coursePrice}\n\nCall / WhatsApp: ${CONFIG.whatsappDisplay}\nRegister directly: https://wa.me/${CONFIG.whatsappNumber}?text=Hello%20BIGnateX,%20I%20want%20to%20register%20for%20the%20course.\n\nWebsite: ${CONFIG.defaultLiveUrl}\n\nCODE. BUILD. GROW. — BIGnateX`;
  };

  // Populate dynamic URLs
  document.querySelectorAll('.dynamic-url').forEach(el => {
    el.textContent = CONFIG.defaultLiveUrl;
  });

  // ==========================================
  // 5. DOWNLOAD FLYER + AUTO-COPY NUMBER & CAPTION
  // ==========================================
  const downloadFlyerBtn = document.getElementById('btn-download-flyer');
  if (downloadFlyerBtn) {
    downloadFlyerBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const captionText = getFullCaption();

      // 1. Copy the caption with phone number to clipboard
      try {
        await navigator.clipboard.writeText(captionText);
        showToast('Flyer downloaded! Caption with WhatsApp number copied to clipboard.');
      } catch (err) {
        const textarea = document.createElement('textarea');
        textarea.value = captionText;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('Flyer downloaded! Caption with WhatsApp number copied to clipboard.');
      }

      // 2. Trigger the flyer image download
      const link = document.createElement('a');
      link.href = CONFIG.flyerPath;
      link.download = 'BIGnateX-Frontend-Development-Course.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  // Standalone Copy Caption Button
  const btnCopyCaption = document.getElementById('btn-copy-caption');
  if (btnCopyCaption) {
    btnCopyCaption.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(getFullCaption());
        showToast('Caption with WhatsApp number copied to clipboard!');
      } catch (err) {
        showToast('Could not copy automatically. Please copy manually.');
      }
    });
  }

  // ==========================================
  // 6. WhatsApp Share Only
  // ==========================================
  const shareWa = document.getElementById('share-wa');
  if (shareWa) {
    shareWa.addEventListener('click', () => {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(getFullCaption())}`, '_blank');
    });
  }

  // ==========================================
  // 7. QR Code Engine
  // ==========================================
  const qrImage = document.getElementById('qr-image');
  const btnDownloadQr = document.getElementById('btn-download-qr');

  if (qrImage) {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(CONFIG.defaultLiveUrl)}&color=06080e`;
    qrImage.src = qrUrl;

    if (btnDownloadQr) {
      btnDownloadQr.addEventListener('click', async () => {
        try {
          const res = await fetch(qrUrl);
          const blob = await res.blob();
          const dUrl = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = dUrl;
          a.download = 'bignatex-qr-code.png';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(dUrl);
          showToast('QR Code download started!');
        } catch (e) {
          window.open(qrUrl, '_blank');
        }
      });
    }
  }

  // ==========================================
  // 8. FAQ Accordion
  // ==========================================
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    const ans = item.querySelector('.faq-answer');
    if (!btn || !ans) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      faqItems.forEach(other => {
        other.classList.remove('active');
        const otherAns = other.querySelector('.faq-answer');
        if (otherAns) otherAns.style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('active');
        ans.style.maxHeight = ans.scrollHeight + "px";
      }
    });
  });
});