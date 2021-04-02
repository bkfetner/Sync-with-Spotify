from django.urls import path

from .views import HomePageView, SearchResultsView, add_room, SearchByGenreView, SearchByNameView, SearchByGenre, SearchByName, add_confirmation, submitpage

urlpatterns = [
    path('search/', SearchResultsView.as_view(), name='search_results'),
    path('searchname/', SearchByName.as_view(), name='searchbyname'),
    path('searchgenre/', SearchByGenre.as_view(), name='searchbygenre'),
    path('searchgenreview/', SearchByGenreView.as_view(), name='searchbygenre_view'),
    path('searchnameview/', SearchByNameView.as_view(), name='searchbyname_view'),
    path('add/', add_room, name="add_room"),
    path('room/', submitpage, name="room"),
    path('addconfirmation/', add_confirmation.as_view(), name="add_confirmation"),
    path('', HomePageView.as_view(), name='home'),
    #path('', showform().as_view(), name='home'),
]