<template>
    <div class="hours_page_container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <img v-if="hoursSideImage" style= "width: 100%;" :src="hoursSideImage.image_url" alt="" class="show_phone">  
        <div class="page_container">
            <div class="all_hours_container">
                <div class="row">
                    <div class="col-md-5 col-sm-5 col-xs-12">
                        <h2 class="hours_heading text-left" >Regular Shopping Hours</h2>
                        <div id="hours_container" class="hours_container">
                            <div class="hours_div text-left" v-for="hour in hours">
                                <span>{{hour.day_of_week | moment("dddd", timezone)}}:</span>
                                <span>{{hour.open_time | moment("h:mm A", timezone)}} - {{hour.close_time | moment("h:mm A", timezone)}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-7 col-sm-7 hidden_phone">
                        <img v-if="hoursSideImage" :src="hoursSideImage.image_url" alt=""/>
                    </div> 
                </div>
                <div class="row">
                    <div class="col-md-12 ">
                        <div v-if="reducedHolidays.length > 0">
                            <div class="padding_tb_30"></div>
                            <h2 class="hours_heading text-left">Extended Holiday Hours</h2>
                            <div id="holidays_hours_container" class="hours_container">
                                <div class="hours_div text-left"  v-for="hour in reducedHolidays">
                                    <span>{{hour.holiday_name}} ({{hour.holiday_date | moment("MMM D YYYY", timezone)}})</span>
                                    <span>{{hour.open_time | moment("h:mm A", timezone)}} - {{hour.close_time | moment("h:mm A", timezone)}}</span>
                                </div>
                            </div>
                            <div class="padding_tb_30"></div>
                        </div>
                        <div v-if="closeHolidays.length > 0">
                            <h2 class="hours_heading text-left">Holiday Closures</h2>
                            <div id="closed_hours_container" class="hours_container">
                                <div class="hours_div text-left" v-for="hour in closeHolidays">
                                    <span>{{hour.holiday_name}} ({{hour.holiday_date | moment("MMM D YYYY", timezone)}})</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="padding_top_40"></div>
            </div>
        </div >
    </div>
</template>
<style>
    .hours_page_container .row{
        margin-left:inherit;
    }
</style>
<script>
    define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment", "vue-meta"], function(Vue, Vuex, moment, tz, VueMoment, Meta) {
        Vue.use(Meta);
        return Vue.component("hours-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    hoursSideImage:null
                }
            },
            created() {
                this.loadData().then(response => {
                    this.dataloaded = true;
                    
                    var temp_repo = this.findRepoByName('Hours Side Image');
                    if(temp_repo && temp_repo.images) {
                        this.hoursSideImage = temp_repo.images[0];
                    } else {
                        this.hoursSideImage = {};
                        this.hoursSideImage.image_url = "";
                    }
                });
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'getPropertyHours',
                    'getPropertyHolidayHours',
                    'findRepoByName'
                ]),
                hours () {
                    var hours = _.sortBy(this.getPropertyHours, ['day_of_week']);
                    var ordered_hours = [];
                    _.forEach(hours, function (val, key) {
                        if(val.day_of_week !== 0) {
                            ordered_hours.push(val);
                        }
                    });
                    ordered_hours.push(hours[0]);
                    return ordered_hours;
                },
                holidayHours () {
                    return this.getPropertyHolidayHours;
                },
                reducedHolidays () {
                    var holidayHours = this.holidayHours;
                    return _.filter(holidayHours, function(o) { return !o.is_closed; });
                },
                closeHolidays () {
                    var holidayHours = this.holidayHours;
                    return _.sortBy(_.filter(holidayHours, function(o) { return o.is_closed; }), [function(o) { return o.holiday_date; }]);
                }
            },
            methods: {
                loadData: async function() {
                    try {
                        let results = await Promise.all([ this.$store.dispatch("getData", "repos"), this.$store.dispatch("getData", "hours")]);
                    } catch (e) {
                        console.log("Error loading data: " + e.message);
                    }
                },
            }
        });
    });
</script>
