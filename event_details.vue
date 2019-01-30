<template>
	<div class="event_dets_container page_container" v-if="currentEvent">
		<div class="row">
			<div class="col-sm-4 event_logo_container hidden_phone">
				<div v-if="currentEvent.eventable_type == 'Property'">
					<img v-if="property.default_logo_url" :src="//codecloud.cdn.speedyrails.net/sites/5beddc9a6e6f6454f6030000/image/jpeg/1544725705000/EventsImage-PlaceHolder-3Thumbnail.jpg" :alt="property.name"/>
				</div>
				<div v-else>
				    <img v-lazy="currentEvent.store.image_url" :alt="urrentEvent.store.name">
				</div>
			</div>
			<div class="col-sm-8 event_image_container text-left">
				<img v-if="_.includes(currentEvent.image_url, 'missing') != true" :src="currentEvent.image_url" :alt="currentEvent.name"/>
			</div>
		</div>
		<div class="row" style="margin-left:0; margin-top: 20px;">
			<div class="col-sm-4 event_details_container text-left">
				<div>
					<h1>{{currentEvent.name}}</h1>
					<p class="event_div_date">{{currentEvent.start_date | moment("MMM D", timezone)}} - {{currentEvent.end_date | moment("MMM D", timezone)}}</p>
				</div>
			</div>
			<div class="col-sm-8 event_desc_container">
				<div class="text-left event_description">
					<p v-html="currentEvent.rich_description"></p>
				</div>
			</div>
		</div>
		
	</div>
</template>
<style>
    .event_logo_container,
    .event_image_container,
    .event_details_container,
    .event_desc_container{
        padding: 20px 10px;
    }
    .event_image_container img{
        max-height: 300px;
    }
    .event_logo_container img{
        border: 1px solid #aea99e;
        width:300px;
        height:300px
    }
    .event_details_container h1{
        padding: 0;
    }
    .event_div_date{
        font-size: 16px;
    }
    .promo_container_title{
        border-top:1px solid #aea99e;
        border-bottom:1px solid #aea99e;
        /*height: 35px;*/
        line-height: 35px;
    }
</style>

<script>
    define(['Vue', 'vuex', 'moment', 'vue-lazy-load'], function(Vue, Vuex, moment, VueLazyload) {
        Vue.use(VueLazyload);
        return Vue.component("event-details-component", {
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
                this.$store.dispatch("getData", "events").then(response => {
                    this.updateCurrentEvent(this.id);
                }, error => {
                  console.error("Could not retrieve data from server. Please check internet connection and try again.");
                });
            },
            watch: {
                currentEvent: function() {
                    var vm = this;
                    var temp_promo = [];
                    var current_id =_.toNumber(this.currentEvent.id);
                    _.forEach(this.allEvents, function(value, key) {
                        if(_.toNumber(value.id) != current_id){
                            var current_promo = vm.findEventById(value.id);
                            current_promo.description_short = _.truncate(current_promo.description, {'length': 70});
                            temp_promo.push(current_promo);
                        }
                    });
                    this.storePromos = temp_promo;
                },
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'processedEvents',
                    'findEventBySlug',
                    'findEventById'
                ]),
                allEvents() {
                    var events = this.processedEvents;
                    var vm = this;
                    events.map(event => {
                        if(event.store != null && event.store != undefined && _.includes(event.store.image_url, 'missing')){
                            event.store.image_url = vm.property.default_logo_url;
                        }
                        else if (event.store == null && event.store == undefined) {
                            event.store = {};
                            event.store.image_url = vm.property.default_logo_url;
                        }
                    });
                    return events;
                },
            },
            methods: {
                updateCurrentEvent (id) {
                    this.currentEvent = this.findEventBySlug(id);
                    if (this.currentEvent === null || this.currentEvent === undefined){
                        this.$router.replace({ path: '/'});
                    }
                }
            }
        });
    });
</script>