import { postCol } from "./collections"

Meteor.publish("showPosts", function (query = {}, limit = 10, skip = 0, sort = {}) {
    return postCol.find(query, {
        limit, skip, sort
    })
})


Meteor.publish('getPostsCount', function (query = {}, limit = 10, skip = 0, sort = {}) {
    let count = 0;
    let initializing = true;
    let randomId = Math.random();
    const handleCount = postCol.find(query).observeChanges({
        added: () => {
            count += 1;
            if (!initializing) {
                this.changed('postsCount', randomId, {
                    count
                });
            }
        },
        removed: () => {
            count -= 1;

            this.changed('postsCount', randomId, {
                count
            });
        },
    });
    initializing = false;

    this.added('postsCount', randomId, {
        count
    }, (err, res) => {
        if (err) {
            console.log('error' + err)
        } else {
            console.log('res=' + res)
        }
    });
    this.ready();
    this.onStop(() => handleCount.stop());
})