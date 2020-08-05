import { makePick, outbidPick } from 'services/writes'
import { recordPick, recordOutbid } from 'services/activity'

export async function makeOpenPick({movieId, title}) {
  await makePick({
    movieId: movie.firebase_id,
    points: 3
  })
  await recordPick({
    movieId: movie.firebase_id,
    movieName: movie.title,
  })
}

export async function makeOutbidPick({movieId, pickId, title}) {
  await outbidPick({
    movieId: movie.firebase_id,
    points: 3,
    outbidPickId: props.pick.firebase_id,
  })
  await recordOutbid({
    movieId: movie.firebase_id,
    movieName: movie.title,
    outbidPickId: props.pick.firebase_id,
  })
}