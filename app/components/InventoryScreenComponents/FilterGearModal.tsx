import { StyleSheet, TextInput, View } from "react-native";

import GenericModal from "@/app/components/GenericModal"

import globalStyles, { COLORS } from "@/app/globals";
import { useState } from "react";

export interface Filters {

}


const FilterGearModal = ({onClose, onSubmit}: {onClose: () => void, onSubmit: (filters: Filters) => void}) => {
  const [filters, setFilters] = useState<Filters>({

  });

  return (
    <GenericModal onClose={onClose} onSubmit={() => onSubmit(filters)} submitValidated={true}>
      
    </GenericModal>
  )
}

const styles = StyleSheet.create({

});

export default FilterGearModal;