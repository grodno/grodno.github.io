export class TextField {
  TEMPLATE () {
    return /* html */ `
      <div class="form-group">
        <div class="col-3 col-sm-12">
          <label class="form-label" for="input-example-4">{{caption}}</label>
        </div>
        <div class="col-9 col-sm-12">
          <input class="form-input" id="input-example-4" type="text" 
          placeholder="{{caption}}" value="{{value}}" change="{{onChange}}">
        </div>
      </div>`
  }
}

export class SwitchField {
  TEMPLATE () {
    return /* html */`
      <div class="form-group">
        <div class="col-9 col-sm-12 col-ml-auto">
          <label class="form-switch">
            <input type="checkbox"
            toggle="{{onChange}}"
            checked="{{value}}"><i class="form-icon"></i> {{caption}}
          </label>
        </div>
      </div>`
  }
}

export class TextareaField {
  TEMPLATE () {
    return /* html */ `
      <div class="form-group">
        <div class="col-3 col-sm-12">
          <label class="form-label" for="input-example-6">{{caption}}</label>
        </div>
        <div class="col-9 col-sm-12">
          <textarea class="form-input" style="min-height: 15vh;" id="input-example-6" placeholder="{{caption}}" rows="3" change="{{onChange}}"  value="{{value}}"></textarea>
        </div>
      </div>`
  }
}

export class RadioField {
  TEMPLATE () {
    return /* html */ `
      <div class="form-group">
        <div class="col-3 col-sm-12">
          <label class="form-label">{{caption}}</label>
        </div>
        <div class="col-9 col-sm-12">
          <label class="form-radio">
            <input type="radio" name="gender"><i class="form-icon"></i> Male
          </label>
          <label class="form-radio">
            <input type="radio" name="gender" checked=""><i class="form-icon"></i> Female
          </label>
        </div>
      </div>`
  }
}

export class EnumField {
  TEMPLATE () {
    return /* html */ `
      <div class="form-group">
        <div class="col-3 col-sm-12">
          <label class="form-label">{{caption}}</label>
        </div>
        <div class="col-9 col-sm-12">
          <Select change="{{onChange}}" options="<- res:{{typeSpec}}"/>
        </div>
      </div>`
  }
}

export class DictField {
  TEMPLATE () {
    return /* html */ `
      <div class="form-group">
        <div class="col-3 col-sm-12">
          <label class="form-label">{{caption}}</label>
        </div>
        <div class="col-9 col-sm-12">
        <Select change="{{onChange}}" options="<- db:dict/{{typeSpec}}"/>
        </div>
      </div>`
  }
}

export class RefField {
  TEMPLATE () {
    return /* html */ `
      <div class="form-group">
        <div class="col-3 col-sm-12">
          <label class="form-label">{{caption}}</label>
        </div>
        <div class="col-9 col-sm-12">
          <Select change="{{onChange}}" options="<- {{typeSpec}}"/>
        </div>
      </div>`
  }
}
