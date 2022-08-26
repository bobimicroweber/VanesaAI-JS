import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

class PersonalityCollection extends Mongo.Collection {

}

export const Personality = new PersonalityCollection('personality');

// Deny all client-side updates since we will be using methods to manage this collection
Personality.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});

Personality.schema = new SimpleSchema({
    _id: { type: String, regEx: SimpleSchema.RegEx.Id },
    name: { type: String },
    userId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
});

Personality.attachSchema(Personality.schema);

// This represents the keys from Lists objects that should be published
// to the client. If we add secret properties to List objects, don't list
// them here to keep them private to the server.
Personality.publicFields = {
    name: 1,
    userId: 1,
};

Factory.define('personality', Personality, {});

Personality.helpers({
    // A list is considered to be private if it has a userId set
    isPrivate() {
        return !!this.userId;
    }
});