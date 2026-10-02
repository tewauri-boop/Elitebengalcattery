(function () {
  if (typeof navigator === 'undefined' || !navigator.modelContext) return;
  navigator.modelContext.provideContext({
    tools: [
      {
        name: "search_products",
        description: "Search Elite Bengal Cattery kittens by keyword, category, or price",
        inputSchema: { type: "object", properties: { query: { type: "string" }, category: { type: "string" }, max_price: { type: "number" } } },
        execute: async ({ query, category, max_price }) => {
          const params = new URLSearchParams();
          if (query) params.set('q', query);
          if (category) params.set('category', category);
          if (max_price) params.set('max_price', max_price);
          const res = await fetch(`https://DOMAIN.com/api/search?${params}`);
          return res.json();
        }
      },
      {
        name: "browse_products",
        description: "Browse kittens by category",
        inputSchema: { type: "object", properties: { category: { type: "string" } } },
        execute: async ({ category }) => {
          const url = category ? `https://DOMAIN.com/shop/${category}/` : `https://DOMAIN.com/shop/`;
          window.location.href = url;
          return { url };
        }
      },
      {
        name: "order_via_whatsapp",
        description: "Initiate a WhatsApp kitten reservation. Free pet courier delivery included.",
        inputSchema: { type: "object", properties: { message: { type: "string" } } },
        execute: async ({ message }) => {
          const url = message ? `https://wa.me/17203100222?text=${encodeURIComponent(message)}` : `https://wa.me/17203100222`;
          window.open(url, '_blank');
          return { url };
        }
      },
      {
        name: "get_wholesale_info",
        description: "Get breeding rights tiers and pedigree information",
        inputSchema: { type: "object", properties: {} },
        execute: async () => {
          window.location.href = `https://DOMAIN.com/wholesale/`;
          return { url: `https://DOMAIN.com/wholesale/` };
        }
      },
      {
        name: "contact",
        description: "Contact Elite Bengal Cattery for questions or support",
        inputSchema: { type: "object", properties: {} },
        execute: async () => {
          window.location.href = `https://DOMAIN.com/contact/`;
          return { url: `https://DOMAIN.com/contact/` };
        }
      }
    ]
  });
})();
