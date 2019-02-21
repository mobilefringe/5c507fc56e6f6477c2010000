<template>
	<div class="event_dets_container page_container" v-if="currentEvent">
		<div class="row">
			<div class="col-sm-4 event_logo_container ">
    			<div class="hidden_phone">
    				<div v-if="currentEvent.eventable_type == 'Property'">
    					<img v-if="property.default_logo_url" :src="property.default_logo_url" :alt="property.name"/>
    				</div>
    				<div v-else>
    				    <img v-lazy="currentEvent.store.image_url" :alt="currentEvent.store.name">
    				</div>
				</div>
				<div class="event_details_container text-left">
    				<div>
    					<h1>{{currentEvent.name}}</h1>
    					<p class="event_div_date">{{currentEvent.start_date | moment("MMM D", timezone)}} - {{currentEvent.end_date | moment("MMM D", timezone)}}</p>
    				</div>
    			</div>
			</div>
			<div class="col-sm-8 event_image_container text-left">
				<!--<img v-if="_.includes(currentEvent.image_url, 'missing') != true" :src="currentEvent.image_url" :alt="currentEvent.name"/>-->
				<div class="event_desc_container">
    				<div class="text-left event_description">
    					<p v-html="currentEvent.rich_body"></p>
    				</div>
    			</div>
    			<social-sharing :url="$root.shareURL('events',currentEvent.slug)" :title="currentEvent.title" :description="currentEvent.body" :quote="_.truncate(currentEvent.body, {'length': 99})" twitter-user="" :media="currentEvent.image_url" inline-template >
                    <div class="blog-social-share text-left">
                        <p style="display: inline-block;">Share: </p>
                        <div class="social_share" style="display: inline-block;">
                            <network network="facebook">
                                <i class="fa fa-facebook"></i>
                            </network>
                            <network network="twitter">
                                <i class="fa fa-twitter"></i>
                            </network>
                        </div>
                    </div>
                </social-sharing>
			</div>
		</div>
	</div>
</template>
<style>
    
</style>

<script>
    define(['Vue', 'vuex', 'moment', 'vue-lazy-load'], function(Vue, Vuex, moment, VueLazyload) {
        Vue.use(VueLazyload);
        return Vue.component("noticeboard-details-component", {
            template: template, // the variable template will be injected,
            data: function() {
                return {
                    currentEvent: null,
                    storePromos : null
                }
            },
            props:['id'],
            beforeRouteUpdate(to, from, next) {
                this.currentEvent = this.findEventBySlug(to.params.id);
                if (this.currentEvent === null || this.currentEvent === undefined) {
                    this.$router.replace({
                        name: 'events'
                    });
                }
                next();
            },
            created(){
                this.$store.dispatch("getData", "blogs").then(response => {
                    this.updateCurrentEvent(this.id);
                }, error => {
                  console.error("Could not retrieve data from server. Please check internet connection and try again.");
                });
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'findBlogPostBySlug'
                ])
            },
            methods: {
                updateCurrentEvent (id) {
                    this.currentEvent = this.findBlogPostBySlug(id);
                    if (this.currentEvent === null || this.currentEvent === undefined){
                        this.$router.replace({ path: '/'});
                    }
                }
            }
        });
    });
</script>