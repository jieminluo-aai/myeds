
const iconFileName = 'custom-icons.svg';

function sanitiseImageUrl(url) {

}

export function populateIcon(icon) {
  icon.iconDark = getIconDark(icon.icon);
  icon.iconLight = getIconLight(icon.icon);
}

function getIconDark(iconName) {
  return ['icon-car', 'icon-motorcycle'].includes(iconName) ? `${iconFileName}#${iconName}` : `${iconFileName}#${iconName}-dark`;
}

function getIconLight(iconName) {
  return ['icon-car', 'icon-motorcycle'].includes(iconName) ? null : `${iconFileName}#${iconName}-light`;
}
