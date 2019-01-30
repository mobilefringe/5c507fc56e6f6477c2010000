<template>
    <div id="pages_container" v-if="currentPage">
        <div class="page_header all_caps double_border_bottom">
			<div class="page_container text_left" v-html="currentPage.title"> </div>
		</div>
        <div class="page_container">
            <div class="row padding_tb_30" >
                <div class="page_body description_text text_left" v-html="currentPage.body">
                    
                </div>
            </div>
        </div>
        <div style="padding:20px 0;"></div>
    </div>
</template>

<script>
    define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment"], function(Vue, Vuex, moment, tz, VueMoment) {
        return Vue.component("leasing-component", {
            template: template, // the variable template will be injected,
            data: function() {
                return {
                    success_subscribe: false,
                    currentPage: null
                }
            },
            beforeRouteUpdate(to, from, next) {
                this.updateCurrentPage();
                next();
            },
            created(){
              this.updateCurrentPage();
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone'
                ])
            },
            methods: {
                updateCurrentPage (id) {
                    host_name = this.property.mm_host.replace("http:", "");
                    this.$store.dispatch('LOAD_PAGE_DATA', {
                        url: host_name + "/pages/" + this.$root.site + ".json"
                    }).then(response => {
                        this.currentPage = response.data;
                    }, error => {
                        console.error("Could not retrieve data from server. Please check internet connection and try again.");
                        this.$router.replace({ path: '/'});
                    });
                },
            }
        });
    });
</script>