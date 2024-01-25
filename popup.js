document.addEventListener('DOMContentLoaded', function() {
  const colorList = document.getElementById('colorList');
  colorList.style.maxHeight = '500px';
  colorList.style.width = '350px';
  colorList.style.overflowY = 'auto';

  const categories = {
    "Characteristics": [
        {"name": "Kindness & care", "hex": "#E43D8F"},
        {"name": "Strong teams", "hex": "#F37223"},
        {"name": "Resilience & composure", "hex": "#F7B718"},
        {"name": "Strive for excellence", "hex": "#72BF44"},
        {"name": "Communication", "hex": "#00B8D9"},
        {"name": "Lead & empower", "hex": "#005BAA"},
      ],
      "Ryman L&D Brand": [
          {"name": "Dark Blue", "hex": "#0C4487"},
          {"name": "Orange", "hex": "#F46419"},
          {"name": "Teal", "hex": "#00B6A8"},
          {"name": "Red", "hex": "#D71920"},
      ],
      "Academy Primary": [
          {"name": "Purple", "hex": "#472C7B"},
          {"name": "White", "hex": "#FFFFFF"},
      ],
      "Academy Secondary": [
          {"name": "Pink", "hex": "#ED1865"},
          {"name": "Pale Pink", "hex": "#F05D7D"},
          {"name": "Yellow", "hex": "#FEC00F"},
          {"name": "Pale Yellow", "hex": "#FFD167"},
          {"name": "Bright Blue", "hex": "#1AACE3"},
          {"name": "Pale Bright Blue", "hex": "#5FB8E8"},
          {"name": "Pale Teal", "hex": "#5EC1B7"},
          {"name": "Green", "hex": "#38884B"},
          {"name": "Pale Green", "hex": "#629A68"},
          {"name": "Academy Blue", "hex": "#114C8F"},
          {"name": "Pale Academy Blue", "hex": "#48649F"},
          {"name": "Academy Dark Purple", "hex": "#3C2269"},
          {"name": "Academy Purple", "hex": "#472E7C"},
          {"name": "Pale Academy Purple", "hex": "#654E8E"},
      ],
      "Other / common": [
          {"name": "Light Blue", "hex": "#7DB2F3"},
          {"name": "Pale Light Blue", "hex": "#C4E1FE"},
          {"name": "Grid Blue", "hex": "#D6EBFF"},
          {"name": "Pale Grid Blue", "hex": "#E7F2FF"},
          {"name": "Bright Green", "hex": "#00C40D"},
          {"name": "Pale Bright Green", "hex": "#91EE78"},
          {"name": "Pale Green", "hex": "#E3FFEB"},
          {"name": "Bright Red", "hex": "#FF0000"},
          {"name": "Dark Pink", "hex": "#FF8C8C"},
          {"name": "Pale Dark Pink", "hex": "#FF9F9F"},
          {"name": "Pale Pink", "hex": "#FFB3B3"},
          {"name": "Pale Red", "hex": "#FFE3E3"},
          {"name": "Bright Orange", "hex": "#F37121"},
          {"name": "Pale Bright Orange", "hex": "#FBB581"},
          {"name": "Pale Orange", "hex": "#FEF0E5"},
          {"name": "Bright Yellow", "hex": "#FFD000"},
          {"name": "Pale Bright Yellow", "hex": "#FFD966"},
          {"name": "Pale Yellow", "hex": "#FFF2CC"},
          {"name": "Pale Yellow ALT", "hex": "#FFF8AA"},
      ],
  };

  for (let category in categories) {
      const categoryHeader = document.createElement('h2');
      categoryHeader.textContent = category;
      colorList.appendChild(categoryHeader);

      categories[category].forEach(color => {
          const colorDiv = document.createElement('div');
          colorDiv.style.display = "flex";
          colorDiv.style.alignItems = "center";
          colorDiv.style.marginBottom = "10px";

          const swatch = document.createElement('div');
          swatch.style.width = "20px";
          swatch.style.height = "20px";
          swatch.style.backgroundColor = color.hex;
          swatch.style.marginRight = "10px";

          const button = document.createElement('button');
          button.textContent = 'Copy';
          button.style.marginLeft = "10px";
          button.style.cursor = "pointer";
          button.addEventListener('click', function() {
              navigator.clipboard.writeText(color.hex)
                  .then(() => {
                      button.textContent = 'Copied!';
                      setTimeout(() => {
                          button.textContent = 'Copy';
                      }, 1500);
                  })
                  .catch(err => {
                      console.error('Failed to copy hex code', err);
                  });
          });

          const colorName = document.createElement('span');
          colorName.textContent = `${color.name}: ${color.hex}`;
          colorName.style.marginRight = "10px";

          colorDiv.appendChild(colorName);
          colorDiv.appendChild(swatch);
          colorDiv.appendChild(button);
          colorList.appendChild(colorDiv);
      });
  }
});
