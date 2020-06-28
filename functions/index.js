const functions = require('firebase-functions');

exports.completeNight = functions.firestore
  .document('Nights/{nightId}')
  .onUpdate((change, context) => {
    const prevNight = change.before.data();
    const curNight = change.after.data();

    var now = new Date(),
      nextNight = now.setDate(now.getDate() + (3 + (7 - now.getDay())) % 7).getTime();

    if (prevNight.state === "pending" && curNight.state === "completed") {
      // create new night
      let now = new Date(),
        dateOpts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: "numeric", timeZone: 'short' };

      now.setDate(now.getDate() + (3 + (7 - now.getDay())) % 7); // Set to the new wednesday

      return admin.firestore().collection('Nights').add({
        location: "TDB",
        slots: 2,
        date: nextNight,
        state: "pending",
        title: "TBD",
      })
      // deduct 3 points from the pickers
    }
  });

exports.toggleAttendance = functions.https
  .onCall((data, context) => {
    const db = admin.firestore();
    const uid = context.auth.uid;
    const nightId = data.nightId;

    console.log('USER:', db.doc('Users/' + uid));
    return db.collection('Users').doc(uid).get(user => {
      console.log('user?: ', user.data());
    }).then(() => {
      return { isAttending: true }
    })
  });

exports.getAttendance = functions.https
  .onCall((data, context) => {
    const uid = context.auth.uid
    const nightId = data.nightId

    return admin.firestore().collection('Nights').doc(nightId).get().then(night => {
      var attendeeRefs = night.data().attendees,
        attendeeIds = [];

      attendeeRefs.forEach(attendeeRef => {
        attendeeIds.push(attendeeRef.ref.segments[1])
      });

      console.info('User ' + uid + ' attending? ' + attendeeIds.includes(uid))
      return { isAttending: attendeeIds.includes(uid) };
    })

  });

async function makePick({ movieId, email, points }) {
  const pickRef = await admin.firestore()
    .collection('Picks')
    .add({
      movie: admin.firestore().collection('Movies').doc(movieId),
      picker: admin.firestore().collection('Users').doc(email),
      state: "active",
      total_points: points
    })

  await movie.update({
    picks: firebase.firestore.FieldValue.arrayUnion(pickRef)
  })

  return pickRef
}

exports.makePick = functions.https
  .onCall(async (data, context) => {
    const email = context.auth.token.email
    const movieId = data.movieId

    return makePick({
      movieId,
      email,
      points: 3,
    })
  });

exports.outbid = functions.https
  .onCall(async (data, context) => {
    const email = context.auth.token.email
    const { movieId, pickId } = data

    const pickRef = admin.firestore()
      .collection('Picks')
      .doc(pickId)

    const p = await pickRef.get()
    const pickData = p.data()
    console.log('pickData', pickData)
    const outbidPoints = pickData.total_points + 1

    await pickRef.update({
      status: 'outbid'
    })

    return makePick({
      movieId,
      email,
      points: outbidPoints,
    })
  });