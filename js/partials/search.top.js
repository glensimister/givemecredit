$(document).ready(function () {
    var search = `
<div><select>
<option>Web</option>
<option>Users</option>
<option>Officials</option>
<option>Public Services</option>
<option>Connections</option>
<option>Mailbox</option>
<option>Ideas</option>
<option>Jobs</option>
<option>Business</option>
<option>Forum</option>
<option>Courses</option>
<option>Healthcare</option>
<option>Plugins</option>
</select></div>
<div><input type="text" placeholder="Enter keywords"></div>
<div><button type="submit" name="search" id="search-btn" class=""><i class="fa fa-search"></i></button></div>`;

    $('.grid-search').html(search);
});