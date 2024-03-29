/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /*  it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. 
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This is the test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('Feeds URL is not empty', function() {
            for (let feedUrl of allFeeds) 
                {      
                expect(feedUrl.url).toBeDefined();
                expect(feedUrl.url.length).not.toBe(0);
                }
        });

        /* This is the test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('Feeds name is not empty', function() {
            for (let feedName of allFeeds) 
                {      
                expect(feedName.name).toBeDefined();
                expect(feedName.name.length).not.toBe(0);
                }
        });
    });


    /* new test suite named "The menu" */
    describe('The menu', function() {

        /* This is the test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

          it('The menu element is hidden by default', function() {
                expect($('body').hasClass('menu-hidden')).toBeTruthy();
          });

         /* This is the test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

          it('The menu changes visibility when clicked', function() {
                $('a.menu-icon-link').trigger('click');
                expect($('body').hasClass('menu-hidden')).toBe(false);
                $('a.menu-icon-link').trigger('click');
                expect($('body').hasClass('menu-hidden')).toBe(true);
          });
    });

    /* new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* This is the test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
         beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            }); 
         });

        it('Feed container is not empty', function() {
            expect($('.feed').has('.entry').length).toBeGreaterThan(0);  
        });
    });
    /* new test suite named "New Feed Selection" */

    describe('New Feed Selection', function() {
   
        
        var oldFeed;

        beforeEach(function(done) {
            loadFeed(0, function() {
                oldFeed = $('.feed').html();
                loadFeed(1, done);
            });
        });

        /* This is the test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */

        it('New feed is loaded', function() {
            expect($('.feed').html()).not.toEqual(oldFeed);
        });

    });
}());
