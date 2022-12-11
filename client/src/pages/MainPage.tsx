import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../hooks/redux'
import { RootState } from '../store'
import { getAllRooms } from '../store/reducers/rooms/actionRooms'
import { IRoom } from '../store/reducers/rooms/roomSlice'

export const MainPage = () => {
  const dispatch = useAppDispatch()
  const nav = useNavigate()
  const {rooms} = useSelector((state: RootState)=> state.rooms)
  useEffect(() => {
    dispatch(getAllRooms())
  }, [])
  
  return (
    <div className='rooms'>
      <div className='title'>Текущие комнаты торгов</div>
      <div className='list rooms__list'>
        {rooms?.length > 0 && rooms.map((room: IRoom)=>
        <div title='Перейти в текущую комнату' className='current_room' onClick={()=> nav(`/${room._id}`)} key={room._id}>
          {room.name}
        </div>)}
      </div>
    </div>
  )
}
