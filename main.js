require.config({
    paths: {
        'Vue': 'https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.13/vue',
        'vue_router': 'https://cdnjs.cloudflare.com/ajax/libs/vue-router/2.7.0/vue-router.min',
        'axios': 'https://cdnjs.cloudflare.com/ajax/libs/axios/0.16.1/axios.min',
        'jquery': 'https://code.jquery.com/jquery-3.2.1.min',
        'lodash': 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.min',
        'moment': 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment-with-locales.min',
        'moment-timezone': 'https://momentjs.com/downloads/moment-timezone-with-data-2012-2022.min',
        'vue2-filters': 'https://cdn.jsdelivr.net/vue2-filters/0.1.8/vue2-filters.min',
        'vue': 'https://mmvue.codecloudapp.com/require-vuejs.min',
        'vuex': 'https://cdnjs.cloudflare.com/ajax/libs/vuex/2.3.1/vuex.min',
        'vue-i18n': 'https://cdnjs.cloudflare.com/ajax/libs/vue-i18n/6.1.1/vue-i18n.min',
        'text': 'https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min',
        'json': 'https://unpkg.com/requirejs-plugins-current@1.0.3/src/json',
        'js-cookie': 'https://cdnjs.cloudflare.com/ajax/libs/js-cookie/2.1.4/js.cookie.min',
        'vue-meta': 'https://unpkg.com/vue-meta@1.0.4/lib/vue-meta.min',
        'Fuse': 'https://cdnjs.cloudflare.com/ajax/libs/fuse.js/3.0.4/fuse.min',
        'datastore_mutation_types': 'https://mmvue.codecloudapp.com/datastore_mutation_types',
        'datastore_getters': 'https://mmvue.codecloudapp.com/datastore_getters',
        'datastore_actions': 'https://mmvue.codecloudapp.com/datastore_actions',
        'datastore_mutations': 'https://mmvue.codecloudapp.com/datastore_mutations',
        'datastore': 'https://mmvue.codecloudapp.com/datastore',
        'vue-moment': 'https://mmvue.codecloudapp.com/vue-moment',
        'today_hours': 'https://mmvue.codecloudapp.com/today_hours.vue?noext', //append a dummy query string so requireJS doesn't auto-append .js to the end of the url
        'search-component': 'https://preview-mmvue.codecloudapp.com/search-component.vue?noext',
        'slick': 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min',
        'vue-slick': 'https://mmvue.codecloudapp.com/slick.vue?noext',
        'vue-select': 'https://cdn.jsdelivr.net/npm/vue-select@2.3.0/dist/vue-select.min',
        'vue-social-sharing': 'https://cdn.jsdelivr.net/npm/vue-social-sharing@2.3.1/dist/vue-social-sharing.min',
        'vee-validate' : 'https://cdn.jsdelivr.net/npm/vee-validate@latest/dist/vee-validate',
        'lightbox': 'https://mmvue.codecloudapp.com/lightbox',
        'vue-simple-spinner': 'https://cdn.jsdelivr.net/npm/vue-simple-spinner@1.2.8/dist/vue-simple-spinner.min',
        'loader' : 'https://mmvue.codecloudapp.com/loader.vue?noext',
        'vue-lazy-load': 'https://unpkg.com/vue-lazyload/vue-lazyload',
        'bootstrap-vue' : '//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue',
        //mappplic-png--map dependencies
        'mousewheel' : 'https://cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min',
        'mapplic' : 'https://mmvue.codecloudapp.com/mapplic',
        'hammer' : 'https://codecloud.cdn.speedyrails.net/sites/59bac7db6e6f644f22ba0000/text/javascript/1484859750000/hammer.min',
        'mapplic-svg' : 'https://mmvue.codecloudapp.com/mapplic.vue?noext',
        //google map dependcies
        'google-map-api': 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCukCjH3fsuDYBdI44hZKL43m60jEToJjY',
        'google_map': 'https://mmvue.codecloudapp.com/google_map.vue?noext',
        //google translate
        "google-translate" : "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit",
    }
});

require(['Vue', 'vuex', 'vue2-filters', 'vue_router', 'routes', 'datastore', 'vue-i18n', 'locales','jquery', 'moment', "vue-meta", "moment-timezone", "vue-moment",'vue-social-sharing','vue-select', "vue!search-component",'vue-simple-spinner','vue!loader.vue', 'vue!header.vue', 'json!menu_items.json'], function (Vue, Vuex, Vue2Filters, VueRouter, appRoutes, store, VueI18n, messages,$, moment, Meta, tz, VueMoment, SocialSharing, VueSelect, SearchComponent, Spinner, Loader, Header, MenuItems) {
    Vue.use(Meta);
    Vue.use(VueRouter);
    Vue.use(Vue2Filters);
    Vue.use(VueI18n);
    Vue.use(SocialSharing);
    
    /* initialize router */
    const router = new VueRouter({
        mode: 'history',
        routes: appRoutes,
        scrollBehavior(to, from, savedPosition) {
            return {
                x: 0,
                y: 0
            }
        }
    });

    /* initialize i18n */
    const i18n = new VueI18n({
        locale: 'en-ca',
        fallbackLocale: 'en-ca',
        messages,
    });

    Vue.component('v-select', VueSelect.VueSelect);
    /* bootstrap app */
    const vm = new Vue({
        el: '#app',
        data: function() {
            return {
                dataLoaded: false,
                toggle_sitemap: false,
                site: 'langhamsquare',
                menu_items: MenuItems
            }
        },
        created() {
            this.loadData().then(response => {
                this.dataLoaded = true;
                this.property.default_logo_url = "//codecloud.cdn.speedyrails.net/sites/5c507fc56e6f6477c2010000/image/jpeg/1548062300000/Mall_StoreLogo_600x600px_Template.jpg";
            });

        },
        watch: {
            // watcher to update vue-i18n when the locale has been changed by the user
            locale: function(val, oldVal) {
                this.$i18n.locale = val;
                moment.locale(val);
            }
        },
        computed: {
            // computed property for locale which returns locale value from data store and also updates the data store with new locale information
            locale: {
                get() {
                    return this.$store.state.locale
                },
                set(value) {
                    this.$store.commit('SET_LOCALE', {
                        lang: value
                    })
                }
            },
            copyright_year() {
                return moment().year();
            },
            ...Vuex.mapGetters([
                'property',
                'timezone',
                'banners',
                'hours',
                'getTodayHours',
                'processedStores',
            ])
        },
        methods: {
            loadData: async function() {
                try {
                    await this.$store.dispatch('initializeApi', {
                        site: "langhamsquare",
                        version: "v4"
                    });
                    await Promise.all([this.$store.dispatch("getData", "property")]);
                    this.property.mm_host = this.property.mm_host.replace("http:", "");
                    let results = await Promise.all([this.$store.dispatch("INITIALIZE_LOCALE"), this.$store.dispatch("getData", "hours"), this.$store.dispatch("getData", "stores"),this.$store.dispatch("getData", "promotions"),this.$store.dispatch("getData", "events")]);
                    await Promise.all([this.$store.dispatch("LOAD_META_DATA")]);
                    return results;
                } catch (e) {
                    console.log("Error loading data: " + e.message);
                }
            },
            // utility method to allow user to change locale value
            changeLocale: function(val) {
                this.locale = val; // this will update the data store, which in turn will trigger the watcher to update the locale in the system
            },
            shareURL(page,slug){
                console.log("page, slug", page, slug)
                var share_url= "http://www.langhamsquare.ca/" + page + "/" + slug;
                return share_url;
            },
            toggleSiteMap(){
                this.toggle_sitemap = !this.toggle_sitemap;
                if(this.toggle_sitemap) {
                    // footer_sitemap
                    var element = $("#footer_sitemap");
                    console.log("element", $('body').offsetHeight)
                    var position = $("#footer_sitemap").offset().top;
                    console.log("element.offset()", $("#footer_sitemap").offset())
                    window.scrollTo({
                        top: position,
                        behavior: 'smooth'
                    })
                }
            }
        },
        router: router,
        store,
        i18n
    });
});