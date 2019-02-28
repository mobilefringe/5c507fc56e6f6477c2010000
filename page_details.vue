<template>
    <div id="pages_container" v-if="currentPage">
        <h2 class="page_header all_caps double_border_bottom">
			<div class="page_container text_left" v-html="currentPage.title"> </div>
		</h2>
        <div class="page_container">
            <div class="row padding_tb_30" >
                <div class="page_body description_text text_left" v-html="currentPage.body">
                    
                </div>
            </div>
        </div>
        <div style="padding:20px 0;"></div>
    </div>
</template>
<style>
    .page_title {
        /*border-top:1px solid #aea99e;*/
        border-bottom:1px solid #aea99e;
        height: 35px;
        line-height: 35px;
    }
    #pages_container img{
        width: 100%;
        height: auto;
    }
    #pages_container h3{
        color: #000; 
        font-size: 24px; 
        font-weight: inherit; 
        font-family: inherit; 
    }
</style>
<script>
    define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment"], function(Vue, Vuex, moment, tz, VueMoment) {
        return Vue.component("page-details-component", {
            template: template, // the variable template will be injected,
            data: function() {
                return {
                    success_subscribe: false,
                    currentPage: null
                }
            },
            props:['id'],
            beforeRouteUpdate(to, from, next) {
                host_name = this.property.mm_host.replace("http:", "");
                this.$store.dispatch('LOAD_PAGE_DATA', {
                    url: host_name + "/pages/" + to.params.id + ".json"
                }).then(response => {
                    this.currentPage = response.data;
                }, error => {
                    console.error("Could not retrieve data from server. Please check internet connection and try again.");
                    this.$router.replace({ path: '/'});
                });
                next();
            },
            created(){
               this.updateCurrentPage(this.id);
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
                        url: host_name + "/pages/" + id + ".json"
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