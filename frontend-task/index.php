<?php $home=true; include 'header.php'; ?>
    <div class="content content--form">
        <div class="container">
            <header class="content__title">Űrlap címe</header>
            <form class="form js-form">
                <div class="form__item col-12">
                    <input type="email" name="email" id="email" placeholder="E-mail cím" required>
                    <label for="email">E-mail cím</label>
                </div>
                <div class="form__item col-12 form__item--date">
                    <input type="text" value="<?php echo date("Y-m-d");?>" id="datepicker" class="js-datepicker" name="date" required>
                    <label for="datepicker">Dátum</label>
                </div>
                <div class="form__item col-12">
                    <input type="text" name="taxpercentage" class="js-tax-input" id="taxpercentage" placeholder="Adó százalék" required>
                    <label for="taxpercentage">Adó százalék</label>
                </div>
                <div class="form__item col-12">
                    <input type="text" name="price" id="price" placeholder="Bruttó ár" required>
                    <label for="price">Bruttó ár</label>
                </div>
                <div class="form-check col-12">
                    <input class="form-check-input js-tax-check" type="checkbox" value="" id="flexCheckDefault">
                    <label class="form-check-label" for="flexCheckDefault">adómentes</label>
                </div>
                <div class="form__item form__item--button">
                    <button type="submit" class="js-save">Mentés</button>
                </div>
            </form>
        </div>
    </div>
<?php include 'footer.php'; ?>