import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../hooks/redux'
import api from '../plugins/api'
import { RootState } from '../store'
import { getCurrentRooms } from '../store/reducers/rooms/actionRooms'
import { changeCurrentTime } from '../store/reducers/rooms/roomSlice'

export const RoomsPage = () => {
  const dispatch = useAppDispatch()
  const {current_time, current_room} = useSelector((state: RootState)=> state.rooms)
  const refTimer:any = useRef(null)
  useEffect(() => {
    console.log(window.location.pathname.split('/'))
    dispatch(getCurrentRooms({id: window.location.pathname.split('/')[1]}))
    refTimer.current = setInterval(()=> {
        dispatch(changeCurrentTime())
    }, 1000)
    return () => clearInterval(refTimer.current);
  },[])
  
  return (
    <div>{`00:0${Math.floor(current_time / 60)}:${(current_time - Math.floor(current_time / 60) * 60) < 10 ? '0' + (current_time - Math.floor(current_time / 60) * 60) : current_time - Math.floor(current_time / 60) * 60}`}</div>
  )
}
