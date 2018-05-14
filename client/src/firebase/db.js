import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email, level, subLevel) =>
    db.ref(`users/${id}`).set({
        username,
        email,
        level,
        subLevel,
    });


export const nextLevel = (id) => {
    return db.ref(`users/${id}`).once('value').then(function(snapshot) {

        let user = (snapshot.val()) || 'Anonymous';
        let update = {};
        let userRef = db.ref('users');


        if (user.subLevel !== 5){
            update[id] = {
                ...user,
                subLevel: user.subLevel + 1
            }
        }
        else{
            update[id] = {
                ...user,
                level: user.level + 1,
                subLevel: 2
            }
        }

        userRef.update(update);
    });
};


export const getUser = (id) =>
    db.ref(`users/${id}`).once('value');