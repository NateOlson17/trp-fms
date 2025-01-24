import GenericModal from "@/app/components/GenericModal"
import { GearContainer } from "@/app/utils/Gear";


const AddGearModal = ({gear, onClose}: {gear: GearContainer, onClose: () => void}) => {

  return (
    <GenericModal onClose={onClose} onSubmit={() => {}} submitValidated={true}>

    </GenericModal>
  )
}

export default AddGearModal;