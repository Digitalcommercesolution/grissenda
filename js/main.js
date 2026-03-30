// Grissenda Euphorias - Shared JS

// --- Data ---
const fragrances = [
  { id: 1, name: "Neroli Splendour", price: 1180, category: "Floral", description: "A bright and elegant fragrance with notes of neroli, orange blossom, and a touch of Mediterranean citrus.", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800", stock: 15 },
  { id: 2, name: "Saffron Ember", price: 2120, category: "Oriental", description: "A deep, warm fragrance featuring rare saffron, rich amber, and subtle notes of oud.", image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800", stock: 8 },
  { id: 3, name: "Midnight Velvet", price: 1850, category: "Oriental", description: "Enchanting notes of dark rose, patchouli, and vanilla.", image: "https://images.unsplash.com/photo-1512777576244-b846ac3d122f?auto=format&fit=crop&q=80&w=800", stock: 12 },
  { id: 4, name: "Gardenia Muse", price: 1420, category: "Floral", description: "The pure, intoxicating scent of fresh gardenias combined with soft white musk.", image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&q=80&w=800", stock: 20 },
  { id: 5, name: "Santal Oasis", price: 1980, category: "Woody", description: "Creamy sandalwood meets spicy cardamom and cedarwood.", image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800", stock: 10 },
  { id: 6, name: "Citrus Bloom", price: 1250, category: "Citrus", description: "A refreshing burst of bergamot, grapefruit, and lemon verbena.", image: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&q=80&w=800", stock: 18 }
];

const reviews = [
  { id: 1, productId: 1, customer: "Sarah Johnson", rating: 5, comment: "Neroli Splendour is my new signature scent. It's so fresh and lasts all day!", date: "2024-03-15", status: "Approved" },
  { id: 2, productId: 2, customer: "David Mbeki", rating: 4, comment: "Rich and sophisticated. Perfect for formal events.", date: "2024-03-10", status: "Approved" },
  { id: 3, productId: 3, customer: "Emily White", rating: 5, comment: "Absolutely love the depth of Midnight Velvet. Truly luxurious.", date: "2024-02-28", status: "Approved" },
  { id: 4, productId: 1, customer: "Thabo Khumalo", rating: 5, comment: "Bought this as a gift, and it was a massive hit. Excellent quality.", date: "2024-03-20", status: "Pending" },
  { id: 5, productId: 5, customer: "Jessica Bloom", rating: 3, comment: "Smells great, but I wish the bottle was slightly larger.", date: "2024-03-22", status: "Approved" }
];

// --- Cart Logic ---
let cart = JSON.parse(localStorage.getItem('grissenda_cart')) || [];

function saveCart() {
  localStorage.setItem('grissenda_cart', JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(productId) {
  const product = fragrances.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart();
  showToast(`${product.name} added to cart!`);
}

function updateCartBadge() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badges = document.querySelectorAll('.cart-badge');
  badges.forEach(badge => {
    badge.textContent = count;
    badge.classList.toggle('hidden', count === 0);
  });
}

// --- UI Helpers ---
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'fixed bottom-8 right-8 bg-luxury-900 text-white px-6 py-4 rounded-2xl shadow-2xl z-[100] animate-in slide-in-from-bottom-8 duration-300';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('animate-out', 'fade-out', 'duration-500');
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

// --- Auth Helpers ---
function isLoggedIn() {
  return localStorage.getItem('isLoggedIn') === 'true';
}

function getUserRole() {
  return localStorage.getItem('userRole');
}

function logout() {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('userRole');
  window.location.href = 'login.html';
}

function requireAuth(role) {
  if (!isLoggedIn() || getUserRole() !== role) {
    window.location.href = 'login.html';
  }
}

// --- Mobile Menu ---
function initMobileMenu() {
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  initMobileMenu();
});
