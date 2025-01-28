import React from 'react'
import { FormGroup, Input, Label } from 'reactstrap'

function CheckBox({name, label, value, onChange, isChecked}) {
  return (
    <FormGroup>
        <Input
            type="checkbox"
            name={name}
            value={value}
            onChange={onChange}
            checked={isChecked}
            id={value}
            data-cy={`ingredient-checkbox-${value}`}
        />
        <Label htmlFor={value} style={{ marginLeft: '10px' }}>{label}</Label>
    </FormGroup>
  )
}

export default CheckBox
