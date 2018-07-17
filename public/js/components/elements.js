
export class Select {
  TEMPLATE () {
    return /* html */ `
      <select class="form-select" change="{{change}}">
        <option selected="{{selected}}" value="" ui:if="!required">...</option>
        <option ui:each="option of options" selected="{{selected}}" value="{{option.id}}">{{optionName}}</option>
      </select>`
  }
  getSelected () {
    return this.option ? this.value === this.option.id : !this.value
  }
  getOptionName () {
    const option = this.option
    return option.name || option.id
  }
  getOptions () {
    if (this.options) {
      return this.options
    }
    this.options = [{name: 'loading...'}]
    return this.options
  }
}

export const BigRedButton = /* html */`    
  <button class="btn tooltip tooltip-left fixed bg-error circle" 
  style="right:1rem; bottom:1rem; width: 2rem;" 
  data-tooltip="{{tooltip}}" click="{{action}}">
  <i class="icon icon-plus"></i>
  </button>`
