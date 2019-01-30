define([], function() {
    return [{
            path: '/',
            component: view('home')
        },
        {
            path: '/stores',
            component: view('default'),
            children: [{
                    path: '',
                    component: view('stores'),
                    name: 'storeList'
                },
                {
                    path: ':id',
                    component: view('store_details'),
                    name: 'storeDetails',
                    props: true
                }
            ]
        },
        {
            path: '/businesses',
            component: view('default'),
            children: [{
                path: '',
                component: view('businesses'),
                name: 'businessList'
            }]
        },
        {
            path: '/restaurants',
            component: view('default'),
            children: [{
                path: '',
                component: view('restaurants'),
                name: 'restaurantList'
            }]
        },
        {
            path: '/promotions',
            component: view('default'),
            children: [{
                    path: '',
                    component: view('promotions'),
                    name: 'promoList'
                },
                {
                    path: ':id',
                    component: view('promotion_details'),
                    name: 'promotionDetails',
                    props: true

                }
            ]
        },
        {
            path: '/events',
            component: view('default'),
            children: [{
                    path: '',
                    component: view('events'),
                    name: 'eventList'
                },
                {
                    path: ':id',
                    component: view('event_details'),
                    name: 'eventDetails',
                    props: true
                }
            ]
        },
        {
            path: '/jobs',
            component: view('default'),
            children: [{
                    path: '',
                    component: view('jobs'),
                    name: 'jobList'
                },
                {
                    path: ':id',
                    component: view('job_details'),
                    name: 'jobDetails',
                    props: true
                }
            ]
        },
        {
            path: '/hours',
            component: view('default'),
            children: [{
                path: '',
                component: view('hours'),
                name: 'hourList'
            }]
        },
        {
            path: '/directions',
            component: view('default'),
            children: [{
                path: '',
                component: view('restaurants'),
                name: 'restaurantList'
            }]
        },
        {
            path: '/contact_us',
            component: view('default'),
            children: [{
                path: '',
                component: view('contact_us'),
                name: 'contactUs'
            }]
        },
        {
            path: '/newsletter',
            component: view('default'),
            children: [{
                path: '',
                component: view('newsletter'),
                name: 'newsletter',
                props: true
            }]
        },
        {
            path: '/pages',
            component: view('default'),
            redirect: '/404',
            children: [{
                path: ':id',
                component: view('page_details'),
                name: 'pageDetails',
                props: true
            }]
        },
        {
            path: '/find_us',
            component: view('default'),
            redirect: '/404',
            children: [{
                path: '',
                component: view('find_us'),
                name: 'findUs'
            }]
        },
        {
            path: '/thank_you',
            component: view('default'),
            redirect: '/404',
            children: [{
                path: '',
                component: view('thank_you'),
                name: 'thankYou'
            }]
        },
        {
            path: '/search-results',
            component: view('default'),
            children: [
                {
                    path: '',
                    component: view('search_results'),
                    meta: {
                        pageName: 'Search Results',
                    },
                    name: 'search-results'
                }
            ]
        },
        {
            path: '/404',
            name: '404',
            component: view('notfoundcomponent')
        },
        {
            path: '*',
            redirect: '/'
        }
    ]

    /**
     * Asynchronously load view (lazy-loading)
     * @param {string} name the filename (basename) of the view to load.
     */
    function view(name) {
        return function(resolve) {
            require(['vue!' + name + '.vue'], resolve);
        }
    };
});