
/**
 * Application forms.
 * Auto-generated file. Do not edit.
 * @vendor https://epam.com
 */

  export class MedicianForm extends Form{
    TEMPLATE() {
      return /*html*/ `
      <ui:fragment>
      <NameField id="name" name="undefined" spec="undefined"/>
    <EnumField id="specialty" name="undefined" spec="specialty"/>
    <EnumField id="category" name="undefined" spec="category"/>
    <EnumField id="degree" name="undefined" spec="degree"/>
    <TagField id="tags" name="undefined" spec="undefined"/>
    <DictField id="city" name="undefined" spec="city"/>
    <RefField id="organization" name="undefined" spec="organization?city={{city}}"/>
    <RefField id="unit" name="undefined" spec="unit?organization={{organization}}"/>
      </ui:fragment>`
    }
  }
export class OrganizationForm extends Form{
    TEMPLATE() {
      return /*html*/ `
      <ui:fragment>
      <RefField id="item" name="undefined" spec="item"/>
    <EnumField id="type" name="undefined" spec="org_type"/>
    <RefField id="address" name="undefined" spec="address"/>
    <RefField id="head_of" name="undefined" spec="person"/>
    <NameField id="name" name="undefined" spec="undefined"/>
    <RefField id="parent" name="undefined" spec="unit"/>
    <RefField id="weight" name="undefined" spec="person"/>
    <RefField id="head_of" name="undefined" spec="person"/>
      </ui:fragment>`
    }
  }
export class AddressForm extends Form{
    TEMPLATE() {
      return /*html*/ `
      <ui:fragment>
      <DictField id="city" name="undefined" spec="city"/>
    <RefField id="street" name="undefined" spec="unit"/>
    <DictField id="country" name="undefined" spec="country"/>
    <EmbedField id="item" name="undefined" spec="item"/>
      </ui:fragment>`
    }
  }
export class PatientForm extends Form{
    TEMPLATE() {
      return /*html*/ `
      <ui:fragment>
      <NameField id="name" name="undefined" spec="undefined"/>
    <DateTimeField id="birth_date" name="undefined" spec="undefined"/>
    <EnumField id="gender" name="undefined" spec="gender"/>
    <EnumField id="marital_status" name="undefined" spec="marital_status"/>
    <IssuesCriticalityField id="emergency_contact" name="undefined" spec="undefined"/>
    <RefField id="address" name="undefined" spec="address"/>
    <IssueTypeField id="phone" name="undefined" spec="undefined"/>
    <IssueNameField id="email" name="undefined" spec="undefined"/>
    <SpanField id="name" name="undefined" spec="undefined"/>
    <TimeAgoField id="position" name="undefined" spec="undefined"/>
    <Field id="date" name="undefined" spec="undefined"/>
    <Field id="medication" name="undefined" spec="undefined"/>
    <Field id="appearance" name="undefined" spec="undefined"/>
    <Field id="quantity" name="undefined" spec="undefined"/>
    <Field id="start_date" name="undefined" spec="undefined"/>
    <Field id="end_date" name="undefined" spec="undefined"/>
    <RefField id="medician" name="undefined" spec="staff"/>
    <Field id="pharmacy" name="undefined" spec="undefined"/>
    <Field id="chronic_conditions" name="undefined" spec="undefined"/>
    <DictField id="risk_factors" name="undefined" spec="risk_factor"/>
    <EnumField id="allergies" name="undefined" spec="allergy"/>
    <NoteField id="notes" name="undefined" spec="undefined"/>
      </ui:fragment>`
    }
  }


