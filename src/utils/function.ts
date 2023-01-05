interface IsetClassNameByValidProps {
  isDefault: boolean;
  successCondition: boolean;
  warningCondition: boolean;
}
export const setClassNameByValid = ({
  isDefault,
  successCondition,
  warningCondition,
}: IsetClassNameByValidProps) => {
  return isDefault
    ? ''
    : warningCondition
    ? 'warning'
    : successCondition
    ? 'success'
    : '';
};
