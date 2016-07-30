//import { polyfill } from 'es6-promise'
import 'babel-polyfill'
import fetch from 'isomorphic-fetch'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_REDDIT = 'SELECT_REDDIT'
export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT'

//选择Reddit
export function selectReddit(reddit) {
  return {
    type: SELECT_REDDIT,
    reddit
  }
}

//按F5刷新Reddit
export function invalidateReddit(reddit) {
  return {
    type: INVALIDATE_REDDIT,
    reddit
  }
}

//发起请求Reddit
function requestPosts(reddit) {
  return {
    type: REQUEST_POSTS,
    reddit
  }
}

//接收Posts数据
function receivePosts(reddit, json) {
  return {
    type: RECEIVE_POSTS,
    reddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

//执行Fetch，从服务器拉取数据
export function fetchPosts(reddit) {
  return dispatch => {
    //调用requestPosts Action去更新state
    //dispatch(requestPosts(reddit))
    //response 中包含着各种信息,如 status=200 之类的
    //response.json()是获取的json格式数据
    //json=>是将获取的json格式进行处理，这里调用dispatch receivePosts Action去更新states
    return fetch(`https://www.reddit.com/r/${reddit}.json`)
      .then(response => response.json())
      .then(json => {
          console.log("get the reactjs data ")
          dispatch(receivePosts(reddit, json))
        })
  }
}

//检查数据是否需要更新
function shouldFetchPosts(state, reddit) {
  const posts = state.postsByReddit[reddit]
  //如果某个类型的data为空，就应该调用
  if (!posts) {
    return true
  }
  //如果数据正在fetching那么就不要
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

//根据新闻是否需要被更新，而去更新。
export function fetchPostsIfNeeded(reddit) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), reddit)) {
      return dispatch(fetchPosts(reddit))
    }
  }
}


