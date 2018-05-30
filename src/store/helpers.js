import { unionWith, find, filter, includes, assign, map, indexOf, uniqBy, forEach } from 'lodash'

export const update_resource = function(local_list, payload_list) {
  forEach(payload_list, function(entity, index, payload_list) {
    const known_entities = map(local_list, 'id')

    if(includes(known_entities, entity.id)) {

      const local_index = indexOf(local_list, find(local_list, { id: entity.id }))

      if (local_list[local_index].detailed != true) {
        // Update if State data is not detailed
        local_list.splice(local_index, 1, entity)
      } else if (local_list[local_index].detailed === true && entity.detailed === true) {
        // Update if State data is detailed but so is payload data
        local_list.splice(local_index, 1, entity)
      }

    } else {
      // Append if account doesn't exist in state
      local_list.push(entity)
    }
  })
}
