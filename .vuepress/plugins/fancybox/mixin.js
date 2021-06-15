export default {
    mounted() {
        this.update();
    },
    updated() {
        this.update();
    },
    methods: {
        update() {
            document.querySelectorAll("img").forEach(img => {
                img.parentElement.innerHTML = `<a data-fancybox href="${img.src}" content="${img.alt}">${img.outerHTML}</a>`;
            });
        }
    }
};