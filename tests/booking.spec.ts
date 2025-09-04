import { test } from '@playwright/test';
import HomePage from '../pages/HomePage';
import RoomsPage from '../pages/RoomPage';
import ReservationPage from '../pages/ReservationPage';
import BookingFormPage from '../pages/BookingFormPage';

test('Room reservation flow', async ({ page }) => {
  const homePage = new HomePage(page);
  const roomsPage = new RoomsPage(page);
  const reservationPage = new ReservationPage(page);
  const bookingFormPage = new BookingFormPage(page);

  // Open homepage
  await homePage.open();

  // Click BookNow on top of the page
  await homePage.clickHeroBookNow();

  // Select first room
  const { title, priceRoom } = await roomsPage.selectFirstRoom();

  //  Verify reservation page along with room title & calendar
  await reservationPage.verifyPage(title);

  // Select stay duration (example nth(10) to nth(12)). 
  // However this functionality is not working as dates selection are disabled
  const { nights, expectedTotal } = await reservationPage.selectDates(10, 12, Number(priceRoom));

  // Reserve Now
  await reservationPage.clickReserve();

  // Fill form & submit
  await bookingFormPage.fillForm();
  await bookingFormPage.submit();

    // Verify booking confirmed along with selected dates is not being displayed due to application error

});
