<template>
    <div>
        <div class="page_container" style="margin-top:20px;">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d20935.055695043622!2d-79.31602608038101!3d43.857888379183144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4d432f17c12d7%3A0xdac106c5c9ff7436!2s8339+Kennedy+Rd%2C+Unionville%2C+ON+L3R+1J5!5e0!3m2!1sen!2sca!4v1548891273411" width="100%" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>
        </div>
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
        return Vue.component("directions-component", {
            template: template, // the variable template will be injected,
            data: function() {
                return {
                    success_subscribe: false,
                    currentPage: null
                }
            },
            beforeRouteUpdate(to, from, next) {
                // this.updateCurrentPage(to.params.id);
                next();
            },
            created(){
            //   this.updateCurrentPage(this.id);
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