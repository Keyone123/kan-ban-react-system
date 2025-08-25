import React from 'react';
import { Heart, TrendingUp, Sparkles, Award } from 'lucide-react';

interface StatsSectionProps {
  favorites: Set<number>;
}

export const StatsSection: React.FC<StatsSectionProps> = ({ favorites }) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-blue-100 text-sm">Favoritos</p>
          <p className="text-2xl font-bold">{favorites.size}</p>
        </div>
        <Heart className="w-8 h-8 text-blue-200" />
      </div>
    </div>
    <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-purple-100 text-sm">Tendências</p>
          <p className="text-2xl font-bold">20</p>
        </div>
        <TrendingUp className="w-8 h-8 text-purple-200" />
      </div>
    </div>
    <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-green-100 text-sm">Lançamentos</p>
          <p className="text-2xl font-bold">15</p>
        </div>
        <Sparkles className="w-8 h-8 text-green-200" />
      </div>
    </div>
    <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-orange-100 text-sm">Avaliados</p>
          <p className="text-2xl font-bold">100+</p>
        </div>
        <Award className="w-8 h-8 text-orange-200" />
      </div>
    </div>
  </div>
);