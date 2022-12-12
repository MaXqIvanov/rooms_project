import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../hooks/redux'
import api from '../plugins/api'
import { RootState } from '../store'
import { getCurrentRooms } from '../store/reducers/rooms/actionRooms'
import { changeCurrentTime, IUser } from '../store/reducers/rooms/roomSlice'

export const RoomsPage = () => {
  const dispatch = useAppDispatch()
  const {current_time, current_room, current_user_index} = useSelector((state: RootState)=> state.rooms)
  const refTimer:any = useRef(null)
  useEffect(() => {
    dispatch(getCurrentRooms({id: window.location.pathname.split('/')[1]}))
    refTimer.current = setInterval(()=> {
        dispatch(changeCurrentTime())
    }, 1000)
    return () => clearInterval(refTimer.current);
  },[])
  
  return (
    <div className='room'>
      <div className='title room__title'>Ход торгов {current_room.name}</div>
      <div className='separate_line'></div>
      <div className='info room__info'>Уважаемые участники, во время вашего хода вы можете изменить параметры торгов, указанных в таблице: </div>
      <div className='bidding'>
        <div className='bidding__info'>
          <div className='bidding__info__timer'>Ход</div>
          <div className='bidding__info__title'>Параметры и требования</div>
          <div className='parameters parameters__1'>Наличие комплекса мероприятий, повышающих стандарты качества изготовления</div>
          <div className='parameters parameters__2'>Срок изготовления лота, дней</div>
          <div className='parameters parameters__3'>Гарантийные обязательства, мес</div>
          <div className='parameters parameters__4'>Условия оплаты</div>
          <div className='parameters parameters__5'>Стоимость изготовления лота, руб (без НДС)</div>
          <div className='parameters parameters__6'>Действия</div>
        </div>
        <div className='bidding__users'>
          {current_room.users?.length > 0 && current_room.users.map((user: IUser, index: number)=>
              <div className='bidding__users__one_user'>
                {index === current_user_index && <div className='bidding__users__timer'><div>{`00:0${Math.floor(current_time / 60)}:${(current_time - Math.floor(current_time / 60) * 60) < 10 ? '0' + (current_time - Math.floor(current_time / 60) * 60) : current_time - Math.floor(current_time / 60) * 60}`}</div></div>}
                <div className='one_user__title'>Участник №{index + 1}</div>
                <div className='parameters parameters__1'>{user.set_of_measures ? user.set_of_measures : "*"}</div>
                <div className='parameters parameters__2'>{user.production_time}</div>
                <div className='parameters parameters__3'>{user.warranty_obligations}</div>
                <div className='parameters parameters__4'>{user.terms_of_payment}</div>
                <div className='parameters parameters__5'>
                  <div className='lot_price'>{user.lot_price.toLocaleString('en-RU')} руб.</div>
                  <div className='lot_price_red'>-25,000 руб.</div>
                  <div className='lot_price_green'>2,475,000 руб.</div>
                </div>
                <div className='parameters parameters__6'></div>
              </div>)
            }
        </div>
      </div>
    </div>
  )
}
