<script setup>

</script>

<template>
  <ul uk-tab>
    <li class="uk-active"><a href="#">Left</a></li>
    <li><router-link to="/">page One</router-link></li>
    <li><router-link to="/page-2">page Two</router-link></li>
    <li class="uk-disabled"><a>Disabled</a></li>
  </ul>
  <router-link to="/">page One</router-link>
  <router-link to="/page-2">page Two</router-link>
  <header style="background-color: #fff; border-bottom: 1px solid #f2f2f2" data-uk-sticky="show-on-up: true; animation: uk-animation-slide-top">
    <div class="uk-container">
      <nav id="navbar" data-uk-navbar="mode: click;">
        <div class="uk-navbar-left">
          <ul class="uk-navbar-nav">
            <li>
              <a href="#" data-uk-icon="icon:user"></a>
              <div class="uk-navbar-dropdown uk-navbar-dropdown-bottom-left">
                <ul class="uk-nav uk-navbar-dropdown-nav">
                  <li class="uk-nav-header uk-text-small uk-text-primary">YOUR ACCOUNT</li>
                  <li><a href="#"><span data-uk-icon="icon: info"></span> Summary</a></li>
                  <li><a href="#"><span data-uk-icon="icon: refresh"></span> Edit</a></li>
                  <li><a href="#"><span data-uk-icon="icon: settings"></span> Configuration</a></li>
                  <li class="uk-nav-divider"></li>
                  <li><a href="#"><span data-uk-icon="icon: sign-out"></span> Logout</a></li>

                </ul>
              </div>
            </li>
            <li class="uk-visible@s">
              <div>
                <a class="uk-navbar-toggle" data-uk-search-icon href="#"></a>
                <div class="uk-drop" data-uk-drop="mode: click; pos: right-center; offset: 0; boundary: #navbar">
                  <form action="article.html" class="uk-search uk-search-navbar uk-width-1-1">
                    <input class="uk-search-input" type="search" placeholder="Search...">
                  </form>
                </div>
              </div>
            </li>
          </ul>

        </div>
        <div class="uk-navbar-center">
          <a class="uk-navbar-item uk-logo" href="#">Logo</a>
        </div>
        <div class="uk-navbar-right">

          <div class="uk-navbar-item">
            <a class="uk-navbar-toggle uk-hidden@m" data-uk-toggle data-uk-navbar-toggle-icon href="#offcanvas-nav"></a>
            <a href="#" class="uk-button uk-button-default uk-visible@m">PUBLISH</a>
          </div>
        </div>
      </nav>
    </div>
  </header>
  <router-view />
</template>

<style scoped>

</style>