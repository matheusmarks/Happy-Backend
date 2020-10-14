import Orphanages from '../models/Orphanages';
import ImageView from './ImagesView';

export default {
  render(orphanage: Orphanages) {
    return {
      id: orphanage.id,
      name: orphanage.name,
      latitude: orphanage.latitude,
      longitude: orphanage.longitude,
      about: orphanage.about,
      instructions: orphanage.instructions,
      opening_hours: orphanage.opening_hours,
      open_on_weekends: orphanage.open_on_weekends,
      image: ImageView.renderMany(orphanage.image),
    };
  },

  renderMany(orphanages: Orphanages[]) {
    return orphanages.map(orphanage => this.render(orphanage));
  },
};
