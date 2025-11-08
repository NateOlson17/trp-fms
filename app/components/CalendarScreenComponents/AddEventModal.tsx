import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import Event from '@/app/utils/Event';
import { GearContainer } from '@/app/utils/Gear';

import GenericModal from '@/app/components/GenericModal'

import { COLORS } from '@/app/globals';

const AddEventModal = ({gear, onClose, onSubmit}: {gear: GearContainer, onClose: () => void, onSubmit: () => void}) => {
  const [pickerOpen, setPickerOpen] = useState(false);

  let newEvent = {};

  return (
    <GenericModal onClose={onClose} onSubmit={onSubmit} submitValidated={true}>
      <TouchableOpacity onPress={() => setPickerOpen(!pickerOpen)}>
        <Ionicons name={pickerOpen ? 'calendar' : 'calendar-outline'} color={COLORS.GOLD} size={20} />
      </TouchableOpacity>
      
    </GenericModal>
  )
}

export default AddEventModal;