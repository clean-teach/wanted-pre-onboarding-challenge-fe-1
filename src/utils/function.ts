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

export const getDateStringKorean = (date: string | undefined) => {
  if (date) {
    const dateType = new Date(date);
    const year = dateType.getFullYear();
    const month = dateType.getMonth() + 1;
    const day = dateType.getDate();
    const hour = dateType.getHours();
    const minute = dateType.getMinutes();
    const second = dateType.getSeconds();
    return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분 ${second}초`;
  }
};
